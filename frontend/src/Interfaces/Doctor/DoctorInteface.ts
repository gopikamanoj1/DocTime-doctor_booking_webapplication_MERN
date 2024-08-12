import { ReactNode } from "react";

export interface Doctor {
    data:any;  
    _id: string;
    name: string;
    password: string;
    email: string;
    kycStatus: string;
    __v: number;
    address: any[]; // Update the type based on the actual structure of address
    age: number;
      isBlocked: boolean;
    dob: Date;
    fees: number;
    image: string;
    phone: string;
    specialization: string;
    kycDetails: [{ yearsOfExperience: number; hospitalName: string }];
  }

  export interface SlotData {
    doctorId: string;
    startDate: string;
    endDate: string;
    daysOfWeek: string[];
    startTime: string;
    endTime: string;
    breakDuration: number;
    consultationDuration: number;
  }
  
  export interface SlotTime {
    time: string;
    duration: number;
    available: boolean;
  }
  

  export interface KYCDetail {
    certificateImage: string;
    qualificationImage: string;
    aadhaarNumber: string;
    yearsOfExperience: number;
    hospitalName: string;
  }
  
  export interface DoctorDetails {
    _id: string;
    name: string;
    email: string;
    kycStatus: string;
    kycDetails: KYCDetail[];
  }

  export interface TimeSlot {
    start: Date;
    end: Date;
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
    status:string;
    specialty: string;
    doctorId: string;
    userId: string;
  }


