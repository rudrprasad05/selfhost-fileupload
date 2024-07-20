// const express = require("express");
const path = require("path");
import { checkAuthToken } from "./auth";
import { upload } from "./upload";
import {
  UploadImageMetaToSQL,
  GetBucketsByUserID,
  NewBucket,
  CheckBucketAuth,
  GetImagesForBucket,
} from "./db";
var bodyParser = require("body-parser");
var fs = require("fs");
import express, { Express } from "express";
import cors from "cors";
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
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
// upload new images
app.post("/api/upload", checkAuthToken, upload.single("file"), (req, res) => {
  res.status(200).json({ message: "Image Uploaded Successfully" });
});
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

app.post("/api/buckets/auth", async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(400).json({ error: "User ID is required" });
  }
  console.log(data.params.bucketId);

  try {
    const respose = await CheckBucketAuth(
      parseInt(data.params.bucketId),
      parseInt(data.params.bucketId)
    );
    if (respose) {
      res.status(200).json(respose);
      console.log("123");
    } else {
      res.status(401).json(respose);
    }
  } catch {
    res.status(500).json({ error: "An error occurred while fetching buckets" });
  }
});
app.get("/api/buckets/images", async (req, res) => {
  let { bucketId } = req.query;

  if (!bucketId) {
    return res.status(400).json({ error: "bucket is required" });
  }
  try {
    const respose = await GetImagesForBucket(parseInt(bucketId as string));
    console.log(respose);
    res.status(200).json(respose);
  } catch {
    res.status(500).json({ error: "An error occurred while fetching buckets" });
  }
});
app.listen(port, () => {
  console.log("listening on port: " + port);
});
