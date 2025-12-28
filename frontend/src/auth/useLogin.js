import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginApi } from "../services/auth.api";

export default function useLogin() {
    const navigate = useNavigate();
    const { mutate: login, isPending, error } = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            localStorage.setItem("jwtToken", data.jwtToken);
            navigate("/myCalender")
        }
    })
    return { login, isPending, error };
}