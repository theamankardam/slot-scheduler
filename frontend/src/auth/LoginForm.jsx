import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      localStorage.setItem("jwtToken", res.data.jwtToken);
      navigate("/myCalender");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const guestEmail = "guest@example.com";
      const guestPassword = "guest123";
      const res = await axios.post("http://localhost:8000/login", {
        email: guestEmail,
        password: guestPassword,
      });

      localStorage.setItem("jwtToken", res.data.jwtToken);
      navigate("/myCalender");
    } catch (err) {
      setError(err.response?.data?.message || "Guest login failed");
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="username"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-900/60 border border-blue-800/50 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-900/60 border border-blue-800/50 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="cursor-pointer w-full bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-blue-600/40 hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2"
          >
            {/* {!isLoading ? " */}
            Log In
            {/* " : <SpinnerMini />} */}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="h-px bg-blue-900 flex-1"></div>
          <span className="px-3 text-blue-300 text-sm">or</span>
          <div className="h-px bg-blue-900 flex-1"></div>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <button
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
