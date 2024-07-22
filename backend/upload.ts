import express from "express";
import multer from "multer";
import path from "path";
import { GetBucketByApiKey, UploadImageMetaToSQL } from "./db";
var fs = require("fs");

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const bucket = await GetBucketByApiKey(req.headers["x-api-key"] as string);
    req.body.bucketName = bucket.name;
    const dir = path.join(uploadsDir, bucket.name); // Change 'test' to dynamic if needed
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, `./uploads/${bucket.name}/`);
  },

  filename: async function (req, file, cb) {
    const bucket = await GetBucketByApiKey(req.headers["x-api-key"] as string);
    req.body.bucketName = bucket.name;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name =
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
    cb(null, name);
    const url = `/uploads/${bucket.name}/${name}`;
    await UploadImageMetaToSQL(url, bucket.id, file.originalname);
  },
});

export const upload = multer({ storage });
