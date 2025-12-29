import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signupApi } from "../../services/auth.api";
import toast from "react-hot-toast";

export default function useSignup() {
    const navigate = useNavigate();

    const { mutate: signup, isPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success("Signup successful 🎉 Please login");
            navigate("/login", { replace: true })
        },

        onError: (err) => {
            const message = err?.response?.data?.message;
            if (message?.toLowerCase().includes("already")) {
                toast.error("User already exists. Redirecting to login...");
                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 5000);
            }
            else {
                toast.error(message || "Signup failed. Try again");
            }
        },
    })
    return { signup, isPending };
}