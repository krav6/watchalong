const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const users = require('./routes/users');

const app = express();

const corsOptions = {
  origin: 'localhost',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Accept', 'Content-Type', 'Origin', 'X-Requested-With']
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found" });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  return res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
