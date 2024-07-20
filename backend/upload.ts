import express from "express";
import multer from "multer";
import path from "path";
import { UploadImageMetaToSQL } from "./db";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("cb");
    cb(null, `./uploads/${req.headers["bucket"]}/`);
  },

  filename: async function (req, file, cb) {
    console.log("first");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name =
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
    cb(null, name);
    const url = `/uploads/${req.headers["bucket"]}/${name}`;
    await UploadImageMetaToSQL(url, 1, file.originalname);
  },
});
export const upload = multer({ storage });
