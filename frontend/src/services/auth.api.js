import axiosInstance from "./axiosInstance";

export const loginApi = async (data) => {
    const res = await axiosInstance.post("/login", data);
    return res.data;
};

export const signupApi = async (data) => {
    const res = await axiosInstance.post("/signup", data);
    return res.data;
};


export const getCurrentUser = async () => {
    const res = await axiosInstance.get("/currentUser");
    return res.data;
}