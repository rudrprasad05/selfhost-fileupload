const express = require("express");
const multer = require("multer");
const path = require("path");

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

module.exports = { checkAuthToken };
