require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { createUser } = require("./routs/signupRouter");

//middleware
app.use(cors());
app.use(express.json());

//routes
// app.use("/api/v1/image", imageRouter);
// app.use("/api/v1/comment", commentRouter);

app.post("/api/user", createUser);

//playground

app.get("/", (req, res) => {
  res.send("🏹 Hello World!");
});

module.exports = app;
