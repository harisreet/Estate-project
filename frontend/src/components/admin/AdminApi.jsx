import axios from "axios";

export const AdminApi = axios.create({
  baseURL: "http://localhost:8000",
});


// const adminToken = localStorage.getItem("adminToken");
// if (adminToken) {
//   AdminApi.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
// }
// Add request interceptor to attach token dynamically
AdminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
