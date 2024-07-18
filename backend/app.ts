// const express = require("express");
const path = require("path");
import { checkAuthToken } from "./auth";
import { upload } from "./upload";
import { UploadImageMetaToSQL, GetBucketsByUserID, NewBucket } from "./db";
var bodyParser = require("body-parser");
var fs = require("fs");
import express, { Express } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

// config

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
// upload new images
app.post(
  "/api/upload",
  checkAuthToken,
  upload.single("file"),
  async (req, res) => {
    res.status(200).json({ message: "Image Uploaded Successfully" });
  }
);

// get all buckets associated with user
app.get("/api/buckets", async (req, res) => {
  let { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // @ts-ignore
    const respose = await GetBucketsByUserID(parseInt(userId));
    res.status(200).json(respose);
  } catch {
    res.status(500).json({ error: "An error occurred while fetching buckets" });
  }
});

app.post("/api/buckets", async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // @ts-ignore
    const respose = await NewBucket(parseInt(data.userId), data.name);

    var dir = `./uploads/${data.name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    res.status(200).json(respose);
  } catch {
    res.status(500).json({ error: "An error occurred while fetching buckets" });
  }
});

// get images from external source using url
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log("listening on port: " + port);
});
