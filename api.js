import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.110.59:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;