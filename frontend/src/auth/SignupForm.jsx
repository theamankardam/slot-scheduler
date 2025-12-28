import { useNavigate } from "react-router";
import Logo from "../components/Logo";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const inputClass =
  "w-full pl-10 pr-3 py-2.5 bg-gray-900/60 border border-blue-800/50 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-gray-950 flex items-center justify-center px-4 py-10 text-white">
      <div className="bg-gray-800/70 backdrop-blur-lg border border-blue-700/40 shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8 transition-all duration-300 hover:shadow-blue-600/30">
        <div className="flex flex-col items-center mb-8 text-center">
          <Logo textSize="text-3xl sm:text-4xl" color="text-white" />
          <p className="text-blue-200 text-sm mt-2">
            Swap smarter, manage time better ⏰
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FaUser />
            </span>
            <input
              type="text"
              name="fullName"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Full Name"
              className={inputClass}
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={inputClass}
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FaLock />
            </span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={inputClass}
              required
            />
          </div>

          {/* Confirm Password */}
          {/* <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FaLock />
            </span>
            <input
              type="password"
              name="confirmPassword"
              // value={formData.confirmPassword}
              // onChange={handleChange}
              placeholder="Confirm Password"
              className={inputClass}
              required
            />
          </div> */}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            // disabled={isLoading}
            className="cursor-pointer w-full bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-blue-600/40 hover:scale-[1.02] transition-all duration-300 flex justify-center items-center"
          >
            {
              // !isLoading ?
              "Sign Up"
              //  : <SpinnerMini />
            }
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="h-px bg-blue-900 flex-1"></div>
          <span className="px-3 text-blue-300 text-sm">or</span>
          <div className="h-px bg-blue-900 flex-1"></div>
        </div>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </section>
  );
}
