import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSwappableSlots, sendSwapRequest } from "../services/swapRequest.api";
import toast from "react-hot-toast";

export function useSwapRequest() {
    const queryClient = useQueryClient();

    // =========================
    // GET: Swappable slots
    // =========================
    const { data, isLoading } = useQuery({
        queryKey: ["swappable-slots"],
        queryFn: getSwappableSlots,
    });
    const swappableSlots = data?.events ?? [];

    // =========================
    // POST: Send swap request
    // =========================
    const { mutate: requestSwap, isPending: isRequesting } = useMutation({
        mutationFn: sendSwapRequest,
        onSuccess: () => {
            toast.success("Swap request sent successfully");

            // refresh marketplace + my events
            queryClient.invalidateQueries(["swappable-slots"]);
            queryClient.invalidateQueries(["events"]);
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Failed to send swap request"
            );
        },
    });

    return {
        swappableSlots,
        isLoading,
        
        requestSwap,
        isRequesting,


    };
}
