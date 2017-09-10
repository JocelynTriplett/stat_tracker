const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_created: {
    type: String
  },
  tracked_activity: [
       {
           date: {
               type: String,
               required: true,
           },
           amount: {
               type: Number,
           },
       }
   ],
  notes: {
    type: [String]
  },
  tags: {
    type: [String]
  }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
