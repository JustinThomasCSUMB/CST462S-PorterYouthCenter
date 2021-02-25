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

    let sections = ["location", "bodypart", "student", "staff"];
    let sectionData = [];

    for (const i of sections) {
        sectionData[i] = await birs.getSections(i);
    }

    let location = sectionData['location'];
    let bodypart = sectionData['bodypart'];
    let children = sectionData['student'];
    let staff = sectionData['staff'];

    res.render('birsInjury', {
        birsId: '',
        email: "myemail@mail.com",
        children: children,
        staff: staff,
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

    let sections = ["location", "student", "behavior", "possibletrigger", "supportplan", "support", "recovery", "nextsteps", "staff"];
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
    let staff = sectionData['staff']; 

    res.render('birsBehavior', {
        birsId: '',
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

app.get('/reports', commonUIMiddlewares, async (req, res) => {

    let students = await birs.getSections("student");
    res.render('reports', {students: students});
});

app.get('/students', commonUIMiddlewares, async (req, res) => {

    let students = await birs.getSections("student");
    res.render('students', {children: students});
});

app.post('/students', async(req, res) => {
    
    let action = req.body.action;
    let del = req.body.delete;
    let edit = req.body.edit;
    
    let first = req.body.firstName;
    let last = req.body.lastName;
    let contact = req.body.contact;
    let email = req.body.email;
    let id = req.body.studentID;
    
    console.dir(req.body);
    
    console.log(action);

    switch(action) {
        case 'modify':
            if (del) {
                console.log("Delete ID record: " + del);
                students.deleteStudent(del);
            }
            else if (edit) {
                console.log("Edit ID record: " + edit);
            }
        break;
        case 'update':
            console.log("Update ID: " + id);
            students.updateStudent(id, first, last, contact, email);
            
        break;
        case 'add':
            console.log("Add new record");
            students.createStudent(first, last, contact, email);
        break;
    }

    res.redirect('/students');
});

app.post('/birs/injury', commonUIMiddlewares, async(req, res) => {
    
    console.dir(req.body);
    
    let email = req.body.email;
    let studentID = req.body.children;
    let staffID = req.body.staffName;
    let location = req.body.location;
    let date = req.body.dateTime;
    let nChildren  = req.body.numChildrenPresent;
    let nAdults = req.body.numAdultsPresent;
    let bodypart = req.body.bodyPart;
    let injurydescription = req.body.woundDescription;
    let injurycause = req.body.howInjuryOccurred;
    let injurytreatment = req.body.howInjuryTreated;    

    let result = await birs.createInjury(email, studentID, date, staffID, location, nChildren, 
	nAdults, bodypart, injurydescription, injurycause, injurytreatment);

    console.log("Incident ID: " + result.insertId);

    res.redirect('/birs/injury');
});

app.post('/birs/behavior', commonUIMiddlewares, async(req, res) => {
    
    let email = req.body.email;
    let studentID = req.body.children;
    let staffID = req.body.staffName;
    let location = req.body.location;
    let date = req.body.dateTime;
    let nChildren  = req.body.numChildrenPresent;
    let nAdults = req.body.numAdultsPresent;
	let riskBehavior = req.body.riskBehavior;
	let behavior = req.body.behavior;
	let recovery = req.body.recovery;
	let incidentDescription = req.body.incidentDescription;
	let managerSignature = req.body.gerSignature;
    
    let result = await birs.createBehavior(email, studentID, date, staffID, location, nChildren, 
	nAdults, riskBehavior, behavior, recovery, incidentDescription, managerSignature);

    console.log("Incident ID: " + result.insertId);
    
    //deal with other fields once incident ID is obtained

    res.redirect('/birs/injury');
});

/***** api *****/

// gets all reports for specific student or all students
app.get('/api/reports/:startDate/:endDate/:studentId', commonUIMiddlewares, async(req, res) => {
    let studentId = req.params.studentId.toLowerCase();
    let allReports;
    let injuryReports = [];
    let behaviorReports = [];

    if(studentId == 'allstudents'){
        allReports = await reports.getAllReports(req.params.startDate, req.params.endDate);        
    }else{
        allReports = await reports.getStudentReports(req.params.startDate, req.params.endDate, req.params.studentId);       
    }

    allReports.forEach(function(report){
        if(report.bodypart == '' || report.bodypart == null || report.bodypart == undefined){
            behaviorReports.push(report);
        }else{
            injuryReports.push(report);
        }
    });

    res.send({injuryReports: injuryReports, behaviorReports: behaviorReports});
});

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
app.listen("3030", process.env.IP, () => { // set environment variable here
    console.log('Express server is running...');
});  