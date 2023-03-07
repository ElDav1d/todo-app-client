import axios from "axios";

//* FROM HERE ALL BACKEND CALLS
const service = axios.create({
  baseURL: "http://localhost:5005/api",
});

// ! INTERCEPT call before exiting and add token
service.interceptors.request.use((config) => {
  //* extract token from LocalStorage
  // format it
  const storedToken = localStorage.getItem("authToken");
  const tokenAndType = `Bearer ${storedToken}`;

  //* add token to configuration
  if (storedToken) {
    config.headers.authorization = tokenAndType;
  }

  //* return configuration
  return config;
});

export default service;
