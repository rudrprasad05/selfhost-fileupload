const express = require("express");
const multer = require("multer");
const path = require("path");
const { checkAuthToken } = require("./auth.js");

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/${req.headers["bucket"]}/`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage });

// Middleware to check auth token

app.post("/api/upload", checkAuthToken, upload.single("file"), (req, res) => {
  res.status(200).json({ message: "Image Uploaded Successfully" });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log("listening on port: " + port);
});
