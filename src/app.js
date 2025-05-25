require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { createUser } = require("./routs/signupRouter");
const { signin } = require("./routs/signinRouter");

//middleware
app.use(cors());
app.use(express.json());

//routes

app.post("/api/signup", createUser);
app.post("/api/signin", signin);

//playground

app.get("/", (req, res) => {
  res.send("🏹 Hello World!");
});

module.exports = app;
