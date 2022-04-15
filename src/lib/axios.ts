import axios from "axios";
// import { serviceOptions } from "@api";

export const apiCaller = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  withCredentials: true,
  headers: { "Content-Type": "application/json", "app-type": "client" }
});

// apiCaller.interceptors.request.use(function (config) {
//   const token = App.getAccessToken();
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// serviceOptions.axios = apiCaller;

export default apiCaller;
