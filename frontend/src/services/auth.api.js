import axiosInstance from "./axiosInstance";

export const loginApi = async (data) => {
    const res = await axiosInstance.post("/api/auth/login", data);
    return res.data;
};

export const signupApi = async (data) => {
    const res = await axiosInstance.post("/api/auth/signup", data);
    return res.data;
};


export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/api/auth/currentUser");
    return res.data;
}