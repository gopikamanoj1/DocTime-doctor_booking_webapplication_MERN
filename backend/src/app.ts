import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import serverConfig from './server'
import connectDB from './config/db.connect'
import { routes } from './adapters/Router'
import config from './config/config'
import expresscofig from './express'
import express from 'express'
import dependencies from './frameworks/config/dependencies'

import session, { SessionOptions, MemoryStore, SessionData } from "express-session";
import { Server, Socket } from 'socket.io';


const app = express()
const server = http.createServer(app)

connectDB(config)
const store = new MemoryStore();


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




const io: Server = require('socket.io')(server,{
  cors: { origin:
     ["http://localhost:5173", "http://localhost:3000", 'https://doctime-doctor-booking-webapplication-42qm.onrender.com', 'https://doctime-doctor-booking-webapplication.onrender.com'] }
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
     
      users[existingUserIndex].socketId = socket.id;
    }

    console.log(users, 'Users in the socket connection');
  });

  socket.on('sendMessage', async ({ senderId, recieverId, content, converstationId, type, timestamp, // Include the current timestamp
}) => {
    console.log('hihi');
    
    const { sendMessegesUseCase } = dependencies.useCase;
    const data = {
      content,
      recieverId,
      senderId,
      type,
      converstationId,
      timestamp, 

    };
    const response = await sendMessegesUseCase(dependencies).executeFunction(data);

    if (response && response.status && response.data) {
      const recipient = users.find((user:any) => user.id === recieverId);
      const sender:any = users.find((user:any) => user.id === senderId)
      if (recipient) {
        console.log('in the resptned',recipient);
        
        io.to(recipient.socketId).to(sender?.socketId).emit('getMessage', { senderId, content, converstationId, recieverId, type ,timestamp});
      }else{
        console.log('in the sender',sender);
        io.to(sender?.socketId).emit('getMessage', { senderId, content, converstationId, recieverId, type ,timestamp});
      }
    }
  });

// ==================================================================================================================

socket.on('sendImage', async ({ senderId, recieverId, content, converstationId, type, timestamp, // Include the current timestamp
}) => {
    console.log('image sending');
    
    const { sendImageUseCase } = dependencies.useCase;
    const data = {
      content,
      recieverId,
      senderId,
      type,
      converstationId,
      timestamp, 

    };
    const response = await sendImageUseCase(dependencies).executeFunction(data);

    if (response && response.status && response.data) {
      const recipient = users.find((user:any) => user.id === recieverId);
         const sender:any = users.find((user:any) => user.id === senderId)
      if (recipient) {
        io.to(recipient.socketId).to(sender?.socketId).emit('getMessage', { senderId, content:response.data.content, converstationId, recieverId, type ,timestamp});
      }else{
        io.to(sender?.socketId).emit('getMessage', { senderId, content, converstationId, recieverId, type ,timestamp});
      }
    }
  });



  // ======================================================================================================================================



  // Handle the audioStream event when a client sends audio
  socket.on('audioStream', async ({ senderId, recieverId, content, converstationId, type, timestamp }) => {
    console.log('Received audio data');
    
    // Use-case function to process and store the audio data
    const { sendAudioUseCase } = dependencies.useCase;
    const audioData = {
      content,
      recieverId,
      senderId,
      type,
      converstationId,
      timestamp, 
    };

    // Process and upload the audio data
    const response = await sendAudioUseCase(dependencies).executeFunction(audioData);
    console.log(response,";;;;;;;;;;;;");
    

    if (response && response.status && response.data) {
      // Find the users by ID
      const recipient = users.find((user:any) => user.id === recieverId);
      const sender = users.find((user:any) => user.id === senderId);

      if (recipient) {
        // Emit the message with the processed content (usually a URL to the stored audio)
        io.to(recipient.socketId).emit('getMessage', {
          senderId,
          content: response.data.content, // S3 URL or processed content
          converstationId,
          recieverId,
          type,
          timestamp,
        });
      }

      // Optionally, emit to the sender as well
      if (sender) {
        io.to(sender.socketId).emit('getMessage', {
          senderId,
          content: response.data.content,
          converstationId,
          recieverId,
          type,
          timestamp,
        });
      }
    } else {
      console.error("Error handling audio data:", response?.message);
    }
  });


  
// ===================================================================================================================================

  socket.on("VideoCall",async(data:any)=>{
    const {createConsultuseCase  } = dependencies.useCase;
    console.log('here---',data);
    
     const {doctorId,userId,roomId,appointmentId}=data
     const apiPayload={
      userId,
      doctorId,
      appointmentId,
      roomId
     }

     const response=await createConsultuseCase(dependencies).executeFunction(apiPayload)
     if(response.status){
      console.log('suucesfully created',response.data);
      
      const user=getUser(userId)
      console.log(user,'Users:::');
      const datas={
        roomId,
        appointmentId
       }
      if(user){
        io.to(user.socketId).emit('VideoCallResponce',datas)
      }
     }
     
     
  })

  console.log(users, '-------users----------');

  socket.on('disconnect', () => {
    // Remove the disconnected user from the array
    users = users.filter((user:any) => user.socketId !== socket.id);
  });

  socket.on('error', (error: any) => {
    console.error(`Socket error for client ${socket.id}:`, error);
  });
} );




app.use('/api', routes(dependencies))

serverConfig(server, config).startServer()



