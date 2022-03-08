const express = require("express");
const res = require("express/lib/response");
const app = express();
const PORT = 3000;

const taskService = require('./services/task');

app.use(express.json());

const mongoose = require("mongoose");

app.get("/api/task/:id", async (req, res) => {
  const data = await taskService.getTaskById(req.params.id);
  res.json(data);
});

app.get("/api/task", async (_, res) => {
  const data = await taskService.getAllTasks();
  console.log("data", data);
  res.json(data);
});

app.post("/api/task", async (req, res) => res.send(await taskService.createTask(req.body)));

app.put("/api/task/:id", async (req, res) => {
  if (req.params === undefined || req.params.id === undefined)
    res.send("please provide an id in the request");
  const id = req.params.id;
  const task = req.body;
  res.send(await taskService.updateTask(id, task));
});

app.delete("/api/task/:id", async (req, res) => {
  if (req.params === undefined || req.params.id === undefined)
    return res.status(404).send("not found, need id");

  const delRes = await taskService.deleteTask(req.params.id);
  if (delRes) res.send("data deleted successfully");
  else res.status(404).send("id not found");
});

app.listen(PORT, async (_) => {
  await mongoose.connect("mongodb://localhost:27017/test");
  console.log("App listenn on http://localhost:" + PORT);
});

process.on("SIGTERM", () => {
  mongoose.disconnect();
});
