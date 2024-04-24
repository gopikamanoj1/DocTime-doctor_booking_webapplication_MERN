// // src/axiosInstance.ts
// import axios from 'axios';

// // Create an Axios instance with default settings
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   timeout: 10000, 
//   headers: {
//     'Content-Type': 'application/json', 
//   },
// });

// // Use interceptors to set the Authorization header with the token
// axiosInstance.interceptors.request.use(
//     (config) => {
//       const accessToken = localStorage.getItem("accessToken");
//       if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

// export default axiosInstance;




import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Request interceptor to add Authorization header with the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config; // Return the updated config
  },
  (error) => {
    return Promise.reject(error); // Forward the error
  }
);

axiosInstance.interceptors.response.use(
    (response) => {
      // Simply return the response if successful
      return response;
    },
    async (error) => {
      const refreshToken = localStorage.getItem("refreshToken");
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        if (refreshToken) {
          try {
            // Avoid infinite retry loop
            originalRequest._retry = true;
  
            // Attempt to refresh the access token
            const refreshResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
              { refreshToken: JSON.parse(refreshToken) } // Pass the refresh token
            );
  
            const { accessToken } = refreshResponse.data;
        
  
            // Store the new access token
            localStorage.setItem("accessToken", accessToken);
  
            // Update the Authorization header with the new token and retry the original request
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest); // Retry the original request
          } catch (refreshError) {
            console.error("Error refreshing access token:", refreshError);
            // Handle failure, possibly by redirecting to login
          }
        }
      }
  
      return Promise.reject(error); // If no refresh token or refresh fails, forward the error
    }
  );




export default axiosInstance;

