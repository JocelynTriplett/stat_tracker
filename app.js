const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustache = require('mustache');
const mustache = require('mustache-express');
const mongoose = require('mongoose');
const Activity = require("./models/activity");
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/stats');

// view engine setup
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views','./views');

app.use(session({
  secret: 'Auaf4PCUWO',
  resave: false,
  saveUninitialized: true
}))
// add ability to parse URL parameter
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// routers
app.use('/', rootRouter);
app.use('/api', apiRouter);

const rootRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

app.listen(3000, function(){
  console.log('Started express application!')
});
