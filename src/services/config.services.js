import axios from "axios";

//* FROM HERE ALL BACKEND CALLS
const service = axios.create({
  baseURL: "http://localhost:5005/api",
});

export default service;
