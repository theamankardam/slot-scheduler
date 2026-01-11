import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getMySwapRequests,
    respondToSwapRequest,
} from "../services/swapRequest.api";
import toast from "react-hot-toast";

export function useSwapNotifications() {
    const queryClient = useQueryClient();

    // =========================
    // GET: Incoming swap requests
    // =========================
    const { data, isLoading } = useQuery({
        queryKey: ["swap-notifications"],
        queryFn: getMySwapRequests,
    });

    console.log(data);
    

    // const requests = data?.requests ?? [];

    // =========================
    // POST: Accept / Reject
    // =========================
    const { mutate: respond, isPending } = useMutation({
        mutationFn: respondToSwapRequest,
        onSuccess: () => {
            toast.success("Response submitted");

            queryClient.invalidateQueries(["swap-notifications"]);
            queryClient.invalidateQueries(["events"]);
            queryClient.invalidateQueries(["swappable-slots"]);
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Action failed"
            );
        },
    });

    return {
        // requests,
        data,
        isLoading,
        respond,
        isPending,
    };
}
