import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signupApi } from "../services/auth.api";

export default function useSignup() {
    const navigate = useNavigate();
    const { mutate: signup, isPending, error } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            navigate("/login")
        }
    })
    return { signup, isPending, error };
}