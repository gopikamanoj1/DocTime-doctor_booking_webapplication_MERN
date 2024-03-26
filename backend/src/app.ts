import http from 'http'
import serverConfig from './server'
import connectDB from './config/db.connect'
import {routes} from './adapters/Router'
import config from './config/config'
import expresscofig from './express'
import express from 'express'
import dependencies from './frameworks/config/dependencies'
import dotenv from 'dotenv'
import session, { SessionOptions,MemoryStore,SessionData } from "express-session";



const app=express()
const server=http.createServer(app)
dotenv.config()
connectDB(config)
const store = new MemoryStore();

// import { oAuth2Client } from 'google-auth-library';

// Now you can access oAuth2Client like this:
// const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);


declare module 'express-session' {
  interface Session {
    userData:{
      name:string,
      email:string,
      password:string,
      
    } ;
    Otp:string,
  }
}

declare module 'express-session' {
  interface Session {
    doctorData:{
      name:string,
      email:string,
      password:string,
      
      
    } ;
    Otp:string,
  }
}

declare module 'express-session' {
  interface Session {
    doctorProfile:{
      phone: string; 
      specialization: string;
      street: string;
      city: string;
      state: string;
      zipcode: string;
      fees: number;
      image: string;
      
      
    } ;
    Otp:string,
  }
}

declare module 'express-session' {
  interface Session {
    kycData:{
      certificateImage: String,
      qualificationImage: String,
      aadhaarNumber: String,
      experienced: Boolean,
      yearsOfExperience: Number,
      hospitalName: String
  }
}
}




app.use( 
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
      },
      store: store,
    } as SessionOptions)
  );
  
expresscofig(app)

app.use('/api',routes(dependencies))
serverConfig(server,config).startServer()
