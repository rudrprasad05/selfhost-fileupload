const express = require("express");
const multer = require("multer");

const app = express();

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
const checkAuthToken = (req, res, next) => {
  const authToken = req.headers["token"];
  if (!authToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (authToken !== "token") {
    res.status(401).json({ message: "Invalid token" });
  }

  // TODO: add an sql db with list of buckets
  const bucket = req.headers["bucket"];
  if (!bucket) {
    return res.status(401).json({ message: "No bucket provided" });
  }

  next();
};

app.post("/api/upload", checkAuthToken, upload.single("file"), (req, res) => {
  res.status(200).json({ message: "Image Uploaded Successfully" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port: " + port);
});
