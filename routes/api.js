const express= require('express');
const Activity = require("../models/activity");
const router = express.Router();

// endpoints in this file are nested under '/api'

router.get('/activities/:id', function(req, res){
  console.log(req.params.id);
  Activity.findOne({_id: req.params.id}).then(function (activity){
    console.log(activity);
    res.json(activity);
  })
});

router.post('/activities/:id/stats', function (req, res) {
  console.log(req.body);
  Activity.findOne({_id: req.params.id}).then(function(activity){
    console.log("activity: "+activity);
    activity.tracked_activity.push(req.body);
    activity.save().then(function () {
        res.redirect('/activities/');
  })
  .catch(function (error) {
    let errorMsg;
      errorMsg = "You have encountered an unknown error."
    res.render('activities', {errorMsg: errorMsg});
  })
})
});

router.get('/activities/', function(req, res){
  Activity.find().then(function (activity){
    res.json(activity);
  })
});

router.post('/activities/', function (req, res) {
  console.log(req.body.name);
  Activity.create(req.body).then(function(activity) {
    console.log(activity);
      res.redirect('/activities/');
    })
  .catch(function (error) {
    let errorMsg;
      errorMsg = "You have encountered an unknown error."
    res.render('activities', {errorMsg: errorMsg});
  })
});

router.get('/', function(req, res){
  res.json({ key: "This value is a string" });
})

module.exports = router;
