import express, { NextFunction } from "express";
import multer from "multer";
import path from "path";
import { VerifyApiKeys } from "./db";

export const checkAuthToken = (req, res, next) => {
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

export const checkApiKey = async (req, res, next) => {
  console.log("hit");
  const xApiKey = req.headers["x-api-key"];
  const xApiSecret = req.headers["x-api-secret"];

  if (!xApiKey || !xApiSecret) {
    return res.status(401).json({ message: "No token provided" });
  }

  const res2 = await VerifyApiKeys(xApiKey, xApiSecret);
  if (res) next();
  else return res.status(401).json({ message: "Invalid token" });
};
