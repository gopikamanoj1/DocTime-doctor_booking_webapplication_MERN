// import dotenv from 'dotenv';
// dotenv.config();
// import express, { Express } from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import http from "http";
// import uploadImage from "./utils/imagesService";
// import fs from 'fs';
// import path from 'path';
// import { Request, Response } from 'express';
// import multer from 'multer';


// const cookieParser = require("cookie-parser");
// import session, { MemoryStore } from "express-session";

// const expressConfig = (app: Express) => {


//   const server = http.createServer(app);

//   const store = new MemoryStore();

//   app.use(bodyParser.json({ limit: "5000mb" }));
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(cookieParser(process.env.COOKIEPARSERSECRET));
//   app.use(express.static("public/"));

//   app.use(
//     cors({
//       origin: ["http://localhost:5173", "http://localhost:3000", 'https://doctime-doctor-booking-webapplication-42qm.onrender.com', 'https://doctime-doctor-booking-webapplication.onrender.com'],
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );


 

//   const upload = multer({ dest: 'uploads/' });

//   app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }

//       const imageUrl = await uploadImage(req.file.path);

//       // Delete the temporary file
//       fs.unlink(path.resolve(req.file.path), (err) => {
//         if (err) console.error('Error deleting temp file:', err);
//       });

//       res.status(200).json({ imageUrl });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to upload image' });
//     }
//   });
//   // Configure AWS S3
//   // const s3 = new AWS.S3({
//   //   accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
//   //   secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
//   //   region: process.env.YOUR_REGION,
//   // });

//   // return s3;


// };

// export default expressConfig;





import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import uploadImage from "./utils/imagesService";
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import session, { MemoryStore } from "express-session";
const cookieParser = require("cookie-parser");

const expressConfig = (app: Express) => {
  const server = http.createServer(app);
  const store = new MemoryStore();

  app.use(bodyParser.json({ limit: "5000mb" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIEPARSERSECRET));

// Serve static files from the React app
const staticPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
console.log("Static path:", staticPath);
app.use(express.static(staticPath));

  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        'https://doctime-doctor-booking-webapplication-42qm.onrender.com',
        'https://doctime-doctor-booking-webapplication.onrender.com'
      ],
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

  app.get('*', (req: Request, res: Response) => {
    const indexPath = path.join(staticPath, 'index.html');
    // console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });

  return server;
};

export default expressConfig;

