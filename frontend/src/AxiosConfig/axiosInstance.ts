
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


// const axiosInstance = axios.create({
//   baseURL: "https://doctime.live", // Adjust the base URL to use the proxy
//   timeout: 30000, // 30 seconds timeout
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, 
// });
// export default axiosInstance;



// axios.js

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "https://doctime.live" : "/api",
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;

