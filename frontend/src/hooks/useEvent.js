import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from "../services/events.api";
import toast from "react-hot-toast";

export function useEvent() {
    const queryClient = useQueryClient();


    // READ (Get Events)
    const { data } = useQuery({
        queryKey: ["events"],
        queryFn: getAllEvents,
    });
    const userEvents = data?.events ?? [];



    // CREATE
    const { mutate: createNewEvent, isPending: isCreating } =
        useMutation({
            mutationFn: createEvent,
            onSuccess: (response) => {
                toast.success(response?.message || "Event created successfully");
                queryClient.invalidateQueries({ queryKey: ["events"] });
            },

            onError: (error) => {
                toast.error(error?.response?.data?.message || "Failed to create event");
            },
        });



    // UPDATE
    const { mutate: updateAnEvent, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, data }) => updateEvent(id, data),
        onSuccess: (response) => {
            toast.success(response?.message || "Event updated successfully");
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to update event");
        },
    });





    // DELETE
    const { mutate: deleteAnEvent } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: (response) => {
            toast.success(response?.message || "Event deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to delete event");
        },
    });


    return {
        userEvents,

        createNewEvent,
        isCreating,

        updateAnEvent,
        isUpdating,

        deleteAnEvent
    };
}

