import express from "express";
import multer from "multer";
import path from "path";
import { UploadImageMetaToSQL } from "./db";
var fs = require("fs");

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(uploadsDir, req.headers["bucket"] as string); // Change 'test' to dynamic if needed
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, `./uploads/${req.headers["bucket"]}/`);
    console.log(req.headers["bucket"]);
  },

  filename: async function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name =
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
    cb(null, name);
    const url = `/uploads/${req.headers["bucket"]}/${name}`;
    await UploadImageMetaToSQL(
      url,
      parseInt(req.headers["bucketid"] as string),
      file.originalname
    );
  },
});

export const upload = multer({ storage });
