const express = require("express");
const multer = require("multer");
const path = require("path");
const { checkAuthToken } = require("./auth.js");
const { upload } = require("./upload.js");

const app = express();
const port = process.env.PORT || 3000;

app.post("/api/upload", checkAuthToken, upload.single("file"), (req, res) => {
  res.status(200).json({ message: "Image Uploaded Successfully" });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log("listening on port: " + port);
});
