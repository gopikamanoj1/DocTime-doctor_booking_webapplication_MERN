import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import http from "http";
import uploadImage from "./utils/imagesService";
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import multer from 'multer';


const cookieParser = require("cookie-parser");
import session, { MemoryStore } from "express-session";

const expressConfig = (app: Express) => {





  const server = http.createServer(app);

  const store = new MemoryStore();

  app.use(bodyParser.json({ limit: "5000mb" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIEPARSERSECRET));
  app.use(express.static("public/"));

  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );




  const upload = multer({ dest: 'uploads/' });

  app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const imageUrl = await uploadImage(req.file.path);

      // Delete the temporary file
      fs.unlink(path.resolve(req.file.path), (err) => {
        if (err) console.error('Error deleting temp file:', err);
      });

      res.status(200).json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });
  // Configure AWS S3
  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
  //   region: process.env.YOUR_REGION,
  // });

  // return s3;


};

export default expressConfig;


