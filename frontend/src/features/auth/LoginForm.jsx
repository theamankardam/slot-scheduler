import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import useLogin from "./useLogin";
import Logo from "../../components/Logo";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { login, isPending } = useLogin();
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleGuestLogin = () => {
    login({ email: "guest@example.com", password: "guest123" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-gray-950 flex items-center justify-center px-4 sm:px-6 py-10 text-white">
      <div className="bg-gray-800/70 backdrop-blur-lg border border-blue-700/40 shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-blue-600/30 hover:-translate-y-1">
        <div className="flex flex-col items-center mb-8 text-center">
          <Logo textSize="text-3xl sm:text-4xl" color="text-white" />
          <p className="text-blue-200 text-sm sm:text-base mt-2">
            Swap your time, simplify your schedule ⏰
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block mb-1 font-semibold text-blue-200 text-sm">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-900/60 border border-blue-800/50 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-blue-200 text-sm">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-900/60 border border-blue-800/50 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer w-full bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-blue-600/40 hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2"
          >
            {isPending ? (
              <span class="loading loading-bars loading-md"></span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="h-px bg-blue-900 flex-1"></div>
          <span className="px-3 text-blue-300 text-sm">or</span>
          <div className="h-px bg-blue-900 flex-1"></div>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <button
            type="button"
            onClick={handleGuestLogin}
            className="flex items-center justify-center gap-2 w-full border border-blue-500 text-blue-300 py-2 rounded-lg hover:bg-blue-900/30 transition cursor-pointer"
          >
            <FaUser /> Continue as Guest
          </button>
        </div>

        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 hover:from-blue-400 hover:to-cyan-300 transition-all duration-200 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </section>
  );
}
