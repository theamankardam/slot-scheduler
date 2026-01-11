import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import useSignup from "./useSignup";
import Logo from "../../components/Logo";

const inputClass =
  "w-full pl-10 pr-3 py-2.5 bg-gray-900/60 border border-blue-800/50 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder-gray-400";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = formData;
  const [formError, setFormError] = useState("");
  const { signup, isPending } = useSignup();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password || !username || !confirmPassword) {
      setFormError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    signup({ username, email, password });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FaEnvelope />
            </span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FaLock />
            </span>
            <input
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className={inputClass}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FaLock />
            </span>
            <input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={inputClass}
            />
          </div>

          {formError && (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer w-full bg-linear-to-r from-blue-600 via-cyan-500 to-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-blue-600/40 hover:scale-[1.02] transition-all duration-300 flex justify-center items-center"
          >
            {isPending ? (
              <span className="loading loading-bars loading-md"></span>
            ) : (
              "Sign Up"
            )}
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
