import express, { NextFunction } from "express";
import multer from "multer";
import path from "path";

export const checkAuthToken = (req, res, next) => {
  const authToken = req.headers["token"];
  console.log("1", authToken);
  if (!authToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  console.log("2", authToken);

  if (authToken !== "token") {
    res.status(401).json({ message: "Invalid token" });
  }
  console.log("3", authToken);

  // TODO: add an sql db with list of buckets
  const bucket = req.headers["bucket"];
  console.log(bucket);
  if (!bucket) {
    return res.status(401).json({ message: "No bucket provided" });
  }
  console.log(bucket);

  next();
};
