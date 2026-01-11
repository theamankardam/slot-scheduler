import axiosInstance from "./axiosInstance";

export const getSwappableSlots = async () => {
    const res = await axiosInstance.get("/api/swappable-slots");
    return res.data;
}


export const sendSwapRequest = async ({ mySlotId, theirSlotId }) => {
    const res = await axiosInstance.post("/api/swap-request", {
        mySlotId,
        theirSlotId,
    });
    return res.data;
};

export const getMySwapRequests = async () => {
    const { data } = await axiosInstance.get("/api/myswap-requests");
    return data;
};

export const gettheirSwapRequests = async () => {
    const { data } = await axiosInstance.get("/api/theirswap-requests");
    return data;
};


export const respondToSwap = async ({ requestId, accept }) => {
    const { data } = await axiosInstance.post(
        `/api/swap-response/${requestId}`,
        { accept }
    );
    return data;
};
