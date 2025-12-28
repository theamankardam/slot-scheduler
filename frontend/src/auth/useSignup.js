import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signupApi } from "../services/auth.api";
import toast from "react-hot-toast";

export default function useSignup() {
    const navigate = useNavigate();

    const { mutate: signup, isPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success("Signup successful 🎉 Please login");
            navigate("/login")
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Signup failed. Try again"
            );
        },
    })
    return { signup, isPending };
}