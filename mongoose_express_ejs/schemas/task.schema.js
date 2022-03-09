const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  content: {
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;