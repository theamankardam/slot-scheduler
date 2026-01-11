import axiosInstance from "./axiosInstance";

export const getAllEvents = async () => {
    const res = await axiosInstance.get("/api/events");
    return res.data;
}

// export const getEventsByStatus = async (status) => {
//     const res = await axiosInstance.get(`/api/events/${status}`);
//     return res.data;
// };


export const createEvent = (data) =>
    axiosInstance.post("/api/events", data);


export const updateEvent = (id, data) =>
    axiosInstance.put(`/api/events/${id}`, data);


export const deleteEvent = (id) =>
    axiosInstance.delete(`/api/events/${id}`);
