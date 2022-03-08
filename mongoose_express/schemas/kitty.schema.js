const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  age: {
    type: Number,
  },
  date:{
    required:true,
    type: Date
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;