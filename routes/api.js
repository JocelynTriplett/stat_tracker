const express= require('express');
const Activity = require("../models/activity");
const router = express.Router();

// endpoints in this file are nested under '/api'

router.get('/', function(req, res){
  res.json({ key: "This value is a string" });
})

router.get('/activities', function(req, res){
  Activity.find().then(function (activity){
    res.render('activities', {activity: activity});
  })

  // res.json([
  //   {
  //     item: "Take a nap",
  //     complete: false
  //   },
  //   {
  //     item: "Eat some guacamole",
  //     complete: false
  //   }
  // ]);
});

module.exports = router;
