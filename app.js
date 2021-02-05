const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const mysql = require('mysql'); // might not need
const User = require('./models/users.js');
const Services = require('./models/services.js');
const middlewares = require('./routeMiddleware.js');
const pool = require('./dbPool.js');
var bodyParser = require('body-parser');

require('dotenv').config(); // process.env variables

// All UI routes will use these variables
const commonUIMiddlewares = [middlewares.appLocals];
const app = express();



// home page
app.get('/', ...commonUIMiddlewares, (req, res) =>{
    res.render('index');
});

// start server
//app.listen(8080, process.env.IP, () => {
app.listen(process.env.PORT, process.env.IP, () => { // set environment variable here
    console.log('Express server is running...');
});
  