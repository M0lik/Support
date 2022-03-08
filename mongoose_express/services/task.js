const Task = require("../schemas/kitty.schema");

module.exports = {
  createTask: async ({ name, age, date }) => {
    try {
      const task = new Task({ name, age, date });
      const res = await task.save();
      return res;
    } catch (e) {
      return null;
    }
  },

  getAllTasks: async () => {
    const res = await Task.find();
    console.log("res", res);
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
    await t.updateOne({ age: task.age, date: task.data });
    const updatedValue = await Task.findOne({ _id: id });
    return updatedValue;
  },
};
