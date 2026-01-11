import axiosInstance from "./axiosInstance";

export const loginApi = async (data) => {
    const res = await axiosInstance.post("/api/login", data);
    return res.data;
};

export const signupApi = async (data) => {
    const res = await axiosInstance.post("/api/signup", data);
    return res.data;
};


export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/api/currentUser");
    return res.data;
}