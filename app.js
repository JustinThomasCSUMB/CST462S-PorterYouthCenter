const express = require('express');
const session = require('express-session');
//const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const users = require('./models/usersModel.js');
const birs = require('./models/birsModel.js');
const reports = require('./models/reportsModel.js');
const middlewares = require('./routeMiddleware.js');
const students = require('./models/studentsModel.js');
//const pool = require('./dbPool.js');
const bodyParser = require('body-parser');

require('dotenv').config(); // process.env variables

// All UI routes will use these variables
const commonUIMiddlewares = [middlewares.appLocals];
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

const saltRounds = 10; // for bcrypt

// home page
app.get('/', ...commonUIMiddlewares, (req, res) =>{
    res.render('index');
});

// login page
app.get('/login', commonUIMiddlewares, (req, res) => {
    res.render('login', { loginError: false});
});

// login, verify user
app.post('/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const [user] = await users.getByUsername(username);
    const hashedPassword = user ? user.password : '';

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
        req.session.authenticated = true;
        req.session.customerId = user.customer_id;
        res.redirect('/'); // Go back to home page
    }
    else {
        res.render('login', { loginError: true, authenticated: false });
    }
});

// logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/staff', commonUIMiddlewares, async (req, res) => {

       res.render('staff');
});

app.post('/staff', async (req, res) => {

    const userName = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;

    console.dir(req.body);
    
    bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in your password DB.
        console.log("Name: " + firstName + " " + lastName);
        users.createUser(userName, hash, firstName, lastName, email);
    });

    res.redirect('/logout');

});

// birs injury 
app.get('/birs/injury', commonUIMiddlewares, async(req, res) => {

    let sections = ["location", "bodypart", "student"];
    let sectionData = [];

    for (const i of sections) {
        sectionData[i] = await birs.getSections(i);
    }

    let location = sectionData['location'];
    let bodypart = sectionData['bodypart'];
    let children = sectionData['student'];

    res.render('birsInjury', {
        birsId: '',
        email: "myemail@mail.com",
        children: children,
        //staff: staff,
        staff: children,
        location: location,
        bodyPart: bodypart
    });
});

// birs injury by id
// used when editing
app.get('/birs/injury/:id', commonUIMiddlewares, async(req, res) => {
    let children = {};
    let staff = {};
    let location = {};

    res.render('birsInjury', {
        birsId: req.params.id,
        email: "myemail@mail.com",
        children: children,
        staff: staff,
        location: location,
        bodyPart: {}
    });
});

// birs behavior 
app.get('/birs/behavior', commonUIMiddlewares, async(req, res) => {

    let sections = ["location", "student", "behavior", "possibletrigger", "supportplan", "support", "recovery", "nextsteps"];
    let sectionData = [];
    
    for (const i of sections) {
        sectionData[i] = await birs.getSections(i);
    }

    let location = sectionData['location'];
    let behavior = sectionData['behavior'];
    let children = sectionData['student'];
    let triggers = sectionData['possibletrigger'];
    let supports = sectionData['support'];
    let recovery = sectionData['recovery'];    
    let planSupport = sectionData['supportplan']; 
    let steps = sectionData['nextsteps']; 

    res.render('birsBehavior', {
        birsId: '',
        email: "myemail@mail.com",
        children: children,
        staff: children,
        location: location,
        behavior: behavior,
        triggers: triggers,
        supports: supports,
        recovery: recovery,
        planSupport: planSupport,
        steps: steps
    });    
});

// TODO: maybe combine into one get call and pass the ID through the body params
// could save on duplicate code

// birs behavior by id
// used when editing
app.get('/birs/behavior/:id', commonUIMiddlewares, async(req, res) => {
    let children = {};
    let staff = {};
    let location = {};
    let behavior = {};
    let triggers = {};
    let supports = {};
    let recovery = {};
    let planSupport = {};
    let steps = {};

    res.render('birsBehavior', {
        birsId: req.params.id,
        email: "myemail@mail.com",
        children: children,
        staff: staff,
        location: location,
        behavior: behavior,
        triggers: triggers,
        supports: supports,
        recovery: recovery,
        planSupport: planSupport,
        steps: steps
    }); 
});

// gets all reports within selected date range
app.get('/reports', commonUIMiddlewares, async (req, res) => {

    let students = await birs.getSections("student");

    //console.dir(students);

    res.render('reports', {students: students});
});

app.get('/students', commonUIMiddlewares, async (req, res) => {

    let students = await birs.getSections("student");

    //console.dir(students);

    res.render('students', {children: students});
});

app.post('/students', async(req, res) => {
    
    let action = req.body.action;
    let del = req.body.delete;
    let edit = req.body.edit;

    switch(action) {
        case 'modify':
            if (del) {
                console.log("Delete ID record: " + del);
            }
            else if (edit) {
                console.log("Edit ID record: " + edit);
            }
            
        break;
        case 'add':
            console.log("Add new record");
    }

    res.redirect('/students');
});

// gets all reports for specific student or all students
app.get('/reports/:startDateTime/:endDateTime/:studentId', commonUIMiddlewares, async(req, res) => {
    let studentId = req.params.studentId;
    let injuryReports;
    let behaviorReports;

    if(studentId == 'allStudents'){
        injuryReports = await reports.getInjuryReports(req.params.startDateTime, req.params.endDateTime);
        behaviorReports = await reports.getBehaviorReports(req.params.startDateTime, req.params.endDateTime);
    }else{
        injuryReports = await reports.getInjuryReport(req.params.startDateTime, req.params.endDateTime, req.params.studentId);
        behaviorReports = await reports.getBehaviorReport(req.params.startDateTime, req.params.endDateTime, req.params.studentId);
    }

    res.render('reports', {injuryReports: injuryReports, behaviorReports: behaviorReports});
});

/***** api *****/

// submit new behavior birs
app.post('/api/submitBehaviorBirs', commonUIMiddlewares, async(req, res) => {

}); 

// submit new injury birs
app.post('/api/submitInjuryBirs', commonUIMiddlewares, async(req, res) => {

});

// update injury birs report, usually needed for updating signatures
app.put('/api/updateInjuryBirs/:id', commonUIMiddlewares, async(req, res) => {

});

// update behavior birs report, usually needed for updating signatures
app.put('/api/updateBehaviorBirs/:id', commonUIMiddlewares, async(req, res) => {

});










//process.env.PORT
// start server
app.listen("8080", process.env.IP, () => { // set environment variable here
    console.log('Express server is running...');
});  