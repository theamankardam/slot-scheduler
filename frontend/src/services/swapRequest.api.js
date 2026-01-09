import axiosInstance from "./axiosInstance";


export const getSwappableSlots = async () => {
    const res = await axiosInstance.get("/api/swappable-slots");
    return res.data;
}

// services/swapRequest.api.js
export const sendSwapRequest = async ({ mySlotId, theirSlotId }) => {
    const res = await axiosInstance.post("/api/swap-request", {
        mySlotId,
        theirSlotId,
    });
    return res.data;
};
