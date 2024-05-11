
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import http from "http";

const cookieParser = require("cookie-parser");
import session, { MemoryStore } from "express-session";

const expressConfig = (app: Express): AWS.S3 => {
  const server = http.createServer(app);

  const store = new MemoryStore();

  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIEPARSERSECRET));
  app.use(express.static("public/frontend/dist"));
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  // Configure AWS S3
  const s3 = new AWS.S3({
    accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
    secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
    region: process.env.YOUR_REGION,
  });

  return s3;
};

export default expressConfig;

