import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMySwapRequests, getSwappableSlots, gettheirSwapRequests, respondToSwap, sendSwapRequest } from "../services/swapRequest.api";
import toast from "react-hot-toast";


export function useSwapRequest() {
    const queryClient = useQueryClient();
    // GET: Swappable slots
    const { data, isLoading } = useQuery({
        queryKey: ["swappable-slots"],
        queryFn: getSwappableSlots,
    });
    const swappableSlots = data?.events ?? [];


    // GET: Outgoing swap requests
    const {
        data: myRequests = [],
    } = useQuery({
        queryKey: ["swap-Outgoing"],
        queryFn: getMySwapRequests,
    });
    const swapMyRequests = myRequests?.requests ?? [];



    // GET: Incoming swap requests
    const {
        data: theirRequests = [],
    } = useQuery({
        queryKey: ["swap-Incoming"],
        queryFn: gettheirSwapRequests,
    });
    const swapTheirRequests = theirRequests?.requests ?? [];



    // POST: Send swap request
    const { mutate: requestSwap, isPending: isRequesting } = useMutation({
        mutationFn: sendSwapRequest,
        onSuccess: () => {
            toast.success("Swap request sent successfully");
            queryClient.invalidateQueries(["swappable-slots"]);
            queryClient.invalidateQueries(["events"]);
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Failed to send swap request"
            );
        },
    });


    // POST: Accept / Reject swap
    const { mutate: respondSwap, isPending: isResponding } = useMutation({
        mutationFn: respondToSwap,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["swap-Incoming"]);
            queryClient.invalidateQueries(["swap-Outgoing"]);
            queryClient.invalidateQueries(["events"]);
            queryClient.invalidateQueries(["swappable-slots"]);
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Failed to respond to swap"
            );
        },
    });


    return {
        swappableSlots,
        isLoading,

        requestSwap,
        isRequesting,

        swapMyRequests,
        swapTheirRequests,

        respondSwap,
        isResponding,
    };
}
