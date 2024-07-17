const express = require("express");
const multer = require("multer");
const path = require("path");
const { UploadImageMetaToSQL } = require("./db.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/${req.headers["bucket"]}/`);
  },
  filename: async function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const name =
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
    cb(null, name);
    const url = `/uploads/${req.headers["bucket"]}/${name}`;
    await UploadImageMetaToSQL(url, 1, file.originalname);
  },
});
const upload = multer({ storage });

module.exports = { upload };
