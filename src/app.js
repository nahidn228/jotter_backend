
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");


//middleware
app.use(cors());
app.use(express.json());

//routes
// app.use("/api/v1/image", imageRouter);
// app.use("/api/v1/comment", commentRouter);




//playground

app.get("/", (req, res) => {
  res.send("🏹 Hello World!");
});

app.get("/chat", async (req, res) => {
  // const prompt = req.query.prompt;
  const prompt = "How ai works";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  res.send({ message: result.response.text() });
});

module.exports = app;