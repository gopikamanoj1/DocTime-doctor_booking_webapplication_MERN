
import axios from 'axios';

// Create an Axios instance with default settings
// const axiosInstance = axios.create({
//   baseURL: "/api",
//   timeout: 100000, // 10 seconds timeout
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, 
// });


const axiosInstance = axios.create({
  baseURL: "https://doctime-doctor-booking-webapplication-42qm.onrender.com", // Adjust the base URL to use the proxy
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});
export default axiosInstance;

