import http from 'http'
import serverConfig from './server'
import connectDB from './config/db.connect'
import { routes } from './adapters/Router'
import config from './config/config'
import expresscofig from './express'
import express from 'express'
import dependencies from './frameworks/config/dependencies'
import dotenv from 'dotenv'
import session, { SessionOptions, MemoryStore, SessionData } from "express-session";
import { Server, Socket } from 'socket.io';




const app = express()
const server = http.createServer(app)
dotenv.config()
connectDB(config)
const store = new MemoryStore();

// import { oAuth2Client } from 'google-auth-library';

// Now you can access oAuth2Client like this:
// const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

// Session configuration
const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET_KEY || 'defaultSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 60 * 1000, // 30 minutes
    httpOnly: true,
  },
  store: store,
};

// Apply session middleware
app.use(session(sessionOptions));

// Configure Express
expresscofig(app);



// Define session interfaces
declare module 'express-session' {
  interface Session {
    userData?: {
      name: string;
      email: string;
      password: string;
    };
    doctorData?: {
      name: string;
      email: string;
      password: string;
    };
    doctorProfile?: {
      phone: string;
      specialization: string;
      street: string;
      city: string;
      state: string;
      zipcode: string;
      fees: number;
      image: string;
    };
    kycData?: {
      certificateImage: string;
      qualificationImage: string;
      aadhaarNumber: string;
      experienced: boolean;
      yearsOfExperience: number;
      hospitalName: string;
    };
    Otp?: string;
  }
}


const io: Server = require('socket.io')(3001, {
  cors: { origin: "http://localhost:5173" }
});


let users:any = [];

const addUser = (userId:any, socketId:any) => {
  !users.some((user:any) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId:any) => {
  users = users.filter((user:any) => user.socketId !== socketId);
};

const getUser = (userId:any) => {
  return users.find((user:any) => user.id === userId);
};


io.on("connection", (socket: Socket) => {
  console.log('connected', socket.id);

  socket.on('joinChat', (data) => {
    const { chatId, id } = data;

    // Check if the user already exists in the array
    const existingUserIndex = users.findIndex((user:any) => user.id === id);

    if (existingUserIndex === -1) {
      // If the user doesn't exist, add them to the array
      users.push({ id, socketId: socket.id });
    } else {
      // If the user already exists, update their socket ID (in case they reconnected)
      users[existingUserIndex].socketId = socket.id;
    }

    console.log(users, 'Users in the socket connection');
  });

  socket.on('sendMessage', async ({ senderId, recieverId, content, converstationId, type }) => {
    const { sendMessegesUseCase } = dependencies.useCase;
    const data = {
      content,
      recieverId,
      senderId,
      type,
      converstationId
    };
    const response = await sendMessegesUseCase(dependencies).executeFunction(data);

    if (response && response.status && response.data) {
      const recipient = users.find((user:any) => user.id === recieverId);
         const sender:any = users.find((user:any) => user.id === senderId)
      if (recipient) {
        io.to(recipient.socketId).to(sender?.socketId).emit('getMessage', { senderId, content, converstationId, recieverId, type });
      }
    }
  });

  socket.on("VideoCall",(data:any)=>{
     const {userId,roomId,appointmentId}=data
     const datas={
      roomId,
      appointmentId
     }
      const user=getUser(userId)
      io.to(user.socketId).emit('VideoCallResponce',datas)
  })

  console.log(users, '-------users----------');

  socket.on('disconnect', () => {
    // Remove the disconnected user from the array
    users = users.filter((user:any) => user.socketId !== socket.id);
  });

  socket.on('error', (error: any) => {
    console.error(`Socket error for client ${socket.id}:`, error);
  });
});


// ===========================================================================================================




// // Assuming you have the same setup for the socket.io instance and users array as for the users

// let doctors:any = [];

// // Handle doctor connections
// io.on("connection", (socket: Socket) => {
//   console.log('Doctor connected', socket.id);

//   socket.on('joinChat', (data) => {
//     const { chatId, id } = data;

//     // Check if the doctor already exists in the array
//     const existingDoctorIndex = doctors.findIndex((doctor:any) => doctor.id === id);

//     if (existingDoctorIndex === -1) {
//       // If the doctor doesn't exist, add them to the array
//       doctors.push({ id, socketId: socket.id });
//     } else {
//       // If the doctor already exists, update their socket ID (in case they reconnected)
//       doctors[existingDoctorIndex].socketId = socket.id;
//     }

//     console.log(doctors, 'Doctors in the socket connection');
//   });

//   socket.on('sendMessage', async ({ senderId, recieverId, content, converstationId, type }) => {
//     const { sendMessagesUseCase } = dependencies.useCase;
//     const data = {
//       content,
//       recieverId,
//       senderId,
//       type,
//       converstationId
//     };
//     const response = await sendMessagesUseCase(dependencies).executeFunction(data);

//     if (response && response.status && response.data) {
//       const recipient = users.find((user:any) => user.id === recieverId);
//       const sender = doctors.find((doctor:any) => doctor.id === senderId);
//       if (recipient) {
//         io.to(recipient.socketId).to(sender?.socketId).emit('getMessage', { senderId, content, converstationId, recieverId, type });
//       }
//     }
//   });

//   console.log(doctors, '-------doctors----------');

//   socket.on('disconnect', () => {
//     // Remove the disconnected doctor from the array
//     doctors = doctors.filter((doctor:any) => doctor.socketId !== socket.id);
//   });

//   socket.on('error', (error: any) => {
//     console.error(`Socket error for doctor ${socket.id}:`, error);
//   });
// });





app.use('/api', routes(dependencies))
serverConfig(server, config).startServer()
