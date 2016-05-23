'use strict';

// LOAD DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// SET VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// GENERAL PURPOSE MIDDELWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// SET MONGO CONNECTION
if (process.env.MOCHA) {
  const MONGOURL = 'mongodb://localhost/reflecti-tests';
  mongoose.connect(MONGOURL);
} else {
  const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/reflecti';
  mongoose.connect(MONGOURL, err => {
    console.log(err || `MongoDB connected to ${MONGOURL}`);
  });
}

// SET STATICS
app.use(express.static(path.join(__dirname, 'public')));

 // RESPONSE HANDLER
app.use((req, res, next) => {
  res.handler = ((err, data) => {
    console.log(err);
    res.status(err ? 400 : 200).send(err || data);
  });
  next();
});

// ROUTES
app.use('/users', require('./routes/users'));
app.use('/walls', require('./routes/walls'));
app.use('/', require('./routes/index'));


// //  404 HANDLER
// app.use((req, res) => {
//   res.status(404).render('404');
// });

module.exports = app;
