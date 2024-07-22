// const express = require("express");
import path from "path";
import { checkAuthToken, checkApiKey } from "./auth";
import { upload } from "./upload";
import {
  UploadImageMetaToSQL,
  GetBucketsByUserID,
  NewBucket,
  CheckBucketAuth,
  GetImagesForBucket,
  DeleteBucket,
  CreateApiKey,
  GetApiKeys,
} from "./db";
import express, { Express } from "express";
import { deleteDirectory } from "./helper";
import cors from "cors";

var bodyParser = require("body-parser");
var fs = require("fs");
const app: Express = express();
const port = process.env.PORT || 3000;

// config
app.use(cors());
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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// routes
// upload new images
// upload.single("file"),
app.post("/api/upload", checkApiKey, upload.single("file"), (req, res) => {
  const fileBaseUrl = "http://localhost:3000/uploads"; // Change to your actual base URL
  const fileUrl = `${fileBaseUrl}/${req.body.bucketName}/${req.file.filename}`;
  console.log();
  res.status(200).json({
    message: "Image Uploaded Successfully",
    fileUrl: fileUrl,
  });
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

  try {
    const respose = await CheckBucketAuth(
      parseInt(data.params.userId),
      parseInt(data.params.bucketId)
    );
    if (respose) {
      res.status(200).json(respose);
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

    res.status(200).json(respose);
  } catch {
    res.status(500).json({ error: "An error occurred while fetching buckets" });
  }
});
app.delete("/api/buckets", async (req, res) => {
  let data = req.headers;
  let bucketid = data.bucketid;
  console.log(bucketid);

  try {
    const respose = await DeleteBucket(parseInt(bucketid as string));

    if (!respose) {
      res.status(401).json(respose);
    }

    const bucketName = respose.name;
    const dirPath = path.join(__dirname, `./uploads/${bucketName}`);
    console.log(dirPath);
    await deleteDirectory(dirPath);

    res.json({ message: "Bucket and its contents deleted successfully" });
  } catch {
    res.status(500).json({ error: "An error occurred while fetching buckets" });
  }
});

app.post("/api/api-key", async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(400).json({ error: "User ID is required" });
  }
  console.log(req.headers);

  try {
    const response = await CreateApiKey(
      parseInt(req.headers["userid"] as string),
      parseInt(req.headers["bucketid"] as string)
    );
    console.log(data.params.bucketId, data.params.userId);

    res.status(200).json("response");
  } catch {
    res.status(500).json({ error: "An error occurred while fetching buckets" });
  }
});

app.get("/api/api-key", async (req, res) => {
  let { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const response = await GetApiKeys(parseInt(userId as string));
    res.status(200).json(response);
  } catch {
    res.status(500).json({ error: "An error occurred while fetching buckets" });
  }
});

app.post(
  "/api/apikey",
  checkApiKey,
  upload.single("file"),
  async (req, res) => {
    console.log("Route handler");
    console.log("Headers:", req.headers);
    console.log("API Key:", req.headers["x-api-key"]);
    console.log("API Secret:", req.headers["x-api-secret"]);
    console.log("File:", req.file); // Debugging statement
    res.status(200).json("response");
  }
);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
