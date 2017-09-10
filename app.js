const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
//const mustache = require('mustache');
const mustache = require('mustache-express');
const mongoose = require('mongoose');
const Activity = require("./models/activity");
const users = require('./users.js');

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
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// routers

const rootRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

app.use('/', rootRouter);
app.use('/api', apiRouter);

function authenticate(req,username,password){
  console.log(req.session);
  if (user = users.users.find(function(x){
    return x.username === username;
  })) {
  if (user.password === password) {
    console.log ("yay! password is right!");
    req.session.approved = "approved";
  }
  else {
    console.log ("nope, password is wrong.")
  }}
  else {
    console.log("sorry, username not found.")
  }
};

app.get('/',function(req,res){
  res.render('index')
});

app.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  authenticate(req,username,password);
  if (req.session.approved) {
    res.render('yay', {username})
  }
  else {
    res.render('uhoh');
  }
});

app.listen(3000, function(){
  console.log('Started express application!')
});
