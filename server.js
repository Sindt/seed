var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require("passport");
var passportConfig = require("./app/config/passport");

passportConfig(passport);

var db = require('./app/db/db');
var model = require('./app/model/model');

var api = require('./app/routes/api');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', api);

module.exports = app;
