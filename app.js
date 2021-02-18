const express = require('express');
const session = require('express-session');
//const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const user = require('./models/usersModel.js');
const birs = require('./models/birsModel.js');
const reports = require('./models/reportsModel.js');
const middlewares = require('./routeMiddleware.js');
//const pool = require('./dbPool.js');
var bodyParser = require('body-parser');

require('dotenv').config(); // process.env variables

// All UI routes will use these variables
const commonUIMiddlewares = [middlewares.appLocals];
const app = express();

app.use(bodyParser.urlencoded({exteded: true}));
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
    res.render('login');
});

// login, verify user
app.post('/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const [user] = await user.getByUsername(username);
    const hashedPassword = user ? user.password : '';

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
        req.session.authenticated = true;
        req.session.customerId = user.customer_id;
        res.redirect('/'); // Go back to home page
    }
    else {
        res.render('login', { loginError: true })
    }
});

// logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// birs page
app.get('/birs', commonUIMiddlewares, async(req, res) => {
    let students = await birs.getStudents();

    res.render('birs', {birsId:''})
});

// single birs report from id
app.get('/birs/:id', [...commonUIMiddlewares, middlewares.auth], async(req, res) => {
    
    res.render('birs', {birsId: req.params.id});
});

// gets all reports within selected date range
app.get('/reports', commonUIMiddlewares, async (req, res) => {
    let students = await birs.getStudents();
    res.render('reports', {students: students});
});

// gets all reports for specific student or all students
app.get('/reports/:dateStart/:dateEnd/:studentId', commonUIMiddlewares, async(req, res) => {
    let studentId = req.params.studentId;
    let allReports;
    if(studentId == 'allStudents'){
        allReports = await reports.getReports(req.params.dateStart, req,params.dateEnd);
    }else{
        allReports = await reports.getReports(req.params.dateStart, req,params.dateEnd, studentId);
    }

    res.render('reports', {reports: allReports});
});

/***** api *****/

// submit new birs
app.post('/api/submitBirs', commonUIMiddlewares, async(req, res) => {

}); 

// update birs report, usually needed for updating signatures
app.put('/api/updateBirs/:id', commonUIMiddlewares, async(req, res) => {

});








// start server
app.listen(process.env.PORT, process.env.IP, () => { // set environment variable here
    console.log('Express server is running...');
});  