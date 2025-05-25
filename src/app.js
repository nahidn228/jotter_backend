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
const { createFavorite } = require("./routs/createFavorite");
const { getAllData } = require("./routs/getAllData");
const { renameFile } = require("./routs/renameFile");
const { duplicateData } = require("./routs/duplicateData");
const {  deleteOneImage } = require("./routs/deleteOneImage");
const { getSingleFolder } = require("./routs/getSingleFolder");
const { getAllFavorites } = require("./routs/getAllfavourite");

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
app.post("/api/favorite", createFavorite);
app.post("/api/duplicate", duplicateData);


app.get("/api/all-data", getAllData);  
// http://localhost:3000/api/all-data?email=nahid@example.com

app.get("/api/favorites", getAllFavorites);
//http://localhost:3000/api/favorites?email=nahid@example.com

app.get("/api/folder/:id", getSingleFolder);


app.patch("/api/rename", renameFile);
app.delete("/api/image/:id", deleteOneImage);



//playground


app.get("/", (req, res) => {
  res.send("🏹 Hello From Jotter Storage Management!");
});

module.exports = app;
