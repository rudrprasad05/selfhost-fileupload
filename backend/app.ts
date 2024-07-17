// const express = require("express");
const path = require("path");
import { checkAuthToken } from "./auth";
import { upload } from "./upload";
import { UploadImageMetaToSQL, GetBucketsByUserID } from "./db";

import express, { Express } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.post(
  "/api/upload",
  checkAuthToken,
  upload.single("file"),
  async (req, res) => {
    res.status(200).json({ message: "Image Uploaded Successfully" });
  }
);

app.get("/", () => {
  console.log("first");
});

app.get("/api/buckets", async (req, res) => {
  let { userId } = req.query;
  console.log(userId);
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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log("listening on port: " + port);
});
