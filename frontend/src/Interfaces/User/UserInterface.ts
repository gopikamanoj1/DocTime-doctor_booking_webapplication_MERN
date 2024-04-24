import { ReactNode } from "react";

export interface User {
    _id: number;
    name: string;
    email: string;
    isBlocked: boolean;
  }



  export interface Appointment {
    [x: string]: any;
    id: string;
    date: string;
    time: string;
    doctor: {
      [x: string]: ReactNode;
      name: string;
      // other properties of the doctor object if needed
    };
    specialty: string;
  }

  export interface Doctor {
    _id: string;
    name: string;
    password: string;
    email: string;
    kycStatus: string;
    __v: number;
    address: any[]; // Update the type based on the actual structure of address
    age: number;
    dob: string;
    fees: number;
    image: string;
    phone: string;
    specialization: string;
    kycDetails: any[]; // Update the type based on the actual structure of kycDetails
  }