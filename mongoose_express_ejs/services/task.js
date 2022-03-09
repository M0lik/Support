const Task = require("../schemas/task.schema");

module.exports = {
  createTask: async ({ title, content }) => {
    try {
      const task = new Task({ title, content });
      const res = await task.save();
      return res;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  getAllTasks: async () => {
    const res = await Task.find();
    return res;
  },

  getTaskById: async (id) => {
    const res = await Task.findOne({ _id: id });
    return res;
  },

  deleteTask: async (id) => {
    const t = await Task.deleteOne({ _id: id });
    if (t.deletedCount > 1) return true;
    else return false;
  },

  updateTask: async (id, task) => {
    const t = await Task.findOne({ _id: id });
    await t.updateOne({ age: task.title, date: task.content });
    const updatedValue = await Task.findOne({ _id: id });
    return updatedValue;
  },
};
