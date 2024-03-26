import express, { Express,Request,Response } from "express";
import cors from "cors";
import path from 'path'
import multer from "multer";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
// import passport from 'passport';





const cookieParser = require("cookie-parser");

import session, { SessionOptions, MemoryStore } from "express-session";
const expresscofig = (app: Express):  AWS.S3  => {

  const store = new MemoryStore();
  // app.use(passport.initialize());
  // app.use(passport.session());
    app.use(bodyParser.json({limit:"100mb"}))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIEPARSERSECRET));
  app.use(express.static('public/'));
  app.use(
    cors({
      origin: ['http://localhost:5173'],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );


  // Configure AWS S3
  const s3 = new AWS.S3({
    accessKeyId:process.env.YOUR_ACCESS_KEY_ID,
    secretAccessKey:process.env. YOUR_SECRET_ACCESS_KEY,
    region: process.env.YOUR_REGION,
  });

  return s3;
};


export default expresscofig;
