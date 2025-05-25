require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");


const { forgotPassword } = require("./routs/AuthRoute/forgotPasswordRouter");
const { uploadImage, upload } = require("./routs/fileUpload/imageRouter");
const {
  uploadDocMiddleware,
  uploadDoc,
} = require("./routs/fileUpload/noteRouter");
const { createFolder } = require("./routs/fileUpload/createFolder");
const { createUser } = require("./routs/AuthRoute/signupRouter");
const { signin } = require("./routs/AuthRoute/signinRouter");

//middleware
app.use(cors());
app.use(express.json());

//routes

app.post("/api/signup", createUser);
app.post("/api/signin", signin);
app.post("/api/forgot-password", forgotPassword);

//image upload route
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.post("/api/uploadImage", upload.single("image"), uploadImage);

// Doc/pdf file upload route
app.post("/api/uploadDoc", uploadDocMiddleware.single("file"), uploadDoc);

app.post("/api/folder", createFolder);

//playground

app.get("/", (req, res) => {
  res.send("🏹 Hello From Jotter Storage Management!");
});

module.exports = app;
