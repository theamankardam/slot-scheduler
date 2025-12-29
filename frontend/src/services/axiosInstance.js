import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
    // withCredentials: true,
});


// Attach token to every request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);


// Global error handler
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        if (status === 401) {
            localStorage.removeItem("jwtToken");
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;