const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');
var authRouter = require('./routes/auth');
var paymentRouter = require('./routes/payment');
var shipmentRouter = require('./routes/shipment');
var operationRouter = require('./routes/operations');
var dogstatsd = new StatsD();
var app = express();


// view engine setup
app.set('view engine', 'jade');
app.use(Sentry.Handlers.errorHandler());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/payment', paymentRouter);
app.use('/shipment', shipmentRouter);
app.use('/operations', operationRouter);

module.exports = app;