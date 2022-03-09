const express = require("express");
const taskService = require("./services/task");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.urlencoded());
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let newArray = [];
  const result = await taskService.getAllTasks();
  if (result.length > 0) {
    const keys = Object.keys(result[0]._doc);
    newArray = keys.filter((key) => key !== "__v");
  }
  res.render("home", { data: result, keys: newArray });
});

app.get("/api/task/:id", async (req, res) => {
  const data = await taskService.getTaskById(req.params.id);
  res.json(data);
});

app.get("/api/task", async (_, res) => {
  const data = await taskService.getAllTasks();
  res.json(data);
});

app.post("/api/task", async (req, res) => {
  await taskService.createTask(req.body);
  res.redirect("/");
});

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
