import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginApi } from "../../services/auth.api";
import toast from "react-hot-toast";

export default function useLogin() {
    const navigate = useNavigate();
    const { mutate: login, isPending } = useMutation({
        mutationFn: loginApi,
        retry: false,
        onSuccess: (data) => {
            localStorage.setItem("jwtToken", data.token);
            toast.success("Login successful 🚀");
            navigate("/myCalender", { replace: true })
        },

        onError: (err) => {
            toast.error(
                err?.response?.data?.message || "Invalid email or password"
            );
        },


    })
    return { login, isPending };
}