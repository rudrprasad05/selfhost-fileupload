const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
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

  // Validate the token (This is a simple example. In a real-world scenario, use JWT or another method)
  if (authToken === "token") {
    next(); // Token is valid, proceed to the next middleware/route handler
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
};

app.get("/", (req, res) => {
  res.send("hello");
  console.log(req);
});

app.post("/api/upload", checkAuthToken, upload.single("file"), (req, res) => {
  res.send("uploaded suucc");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port: " + port);
});
