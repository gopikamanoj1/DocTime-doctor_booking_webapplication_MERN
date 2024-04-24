// import express, { Express,Request,Response } from "express";
// import cors from "cors";
// import path from 'path'
// import multer from "multer";
// import bodyParser from "body-parser";
// import AWS from "aws-sdk";
// import http from "http";
// import socketIO from "socket.io";
// import Stripe from 'stripe';

// const cookieParser = require("cookie-parser");

// import session, { SessionOptions, MemoryStore } from "express-session";
// const expresscofig = (app: Express):  AWS.S3  => {


  
//   const server = http.createServer(app);



//   const io = socketIO(server);
//   const store = new MemoryStore();
//   // Socket.io connection handler
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Listen for chat messages
//   socket.on("chat message", (msg: string) => {
//     console.log("message: " + msg);
    
//     // Broadcast the message to all connected clients
//     io.emit("chat message", msg);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });
   



//     app.use(bodyParser.json({limit:"100mb"}))
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));
//   app.use(cookieParser(process.env.COOKIEPARSERSECRET));
//   app.use(express.static('public/'));
//   app.use(
//     cors({
//       origin: ['http://localhost:5173'],
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );

//   // Configure AWS S3
//   const s3 = new AWS.S3({
//     accessKeyId:process.env.YOUR_ACCESS_KEY_ID,
//     secretAccessKey:process.env. YOUR_SECRET_ACCESS_KEY,
//     region: process.env.YOUR_REGION,
//   });

//   return s3;
// };


// export default expresscofig;





















import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AWS from "aws-sdk";
import http from "http";
// import { Server as SocketIOServer } from "socket.io"; // Corrected import

const cookieParser = require("cookie-parser");
import session, { MemoryStore } from "express-session";

const expressConfig = (app: Express): AWS.S3 => {
  const server = http.createServer(app);

  // const io = new SocketIOServer(server); // Initialize Socket.IO server
  const store = new MemoryStore();

  // Socket.io connection handler
  // io.on("connection", (socket) => {
  //   console.log("A user connected");

  //   // Listen for chat messages
  //   socket.on("chat message", (msg: string) => {
  //     console.log("message: " + msg);
      
  //     // Broadcast the message to all connected clients
  //     io.emit("chat message", msg);
  //   });

  //   // Handle disconnection
  //   socket.on("disconnect", () => {
  //     console.log("User disconnected");
  //   });
  // });

  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIEPARSERSECRET));
  app.use(express.static("public/"));
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

