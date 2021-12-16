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
var app = express();

Sentry.init({
    dsn: "https://a96feb62e87741019ab499815b1c5f68@o1059744.ingest.sentry.io/6107928",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here
app.get("/test", function rootHandler(req, res) {
    res.end("Hello world!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    // Capture all 404 and 500 errors
    if (error.status === 404 || error.status === 500 || error.status === 401) {
      return true;
    }
    return false;
  },
}));

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