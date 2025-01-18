import React, { useState } from "react";
import "@fontsource/poppins";
import { RiLock2Fill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa"; // Updated icon for username

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  const togglePassword = () => {
    setShowPassword(!showPassword); // Toggle the visibility of password
  };

  return (
    <div className="font-poppins h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-blue-900">
      <form className="bg-white/20 border-2 border-white/70 p-8 text-white rounded-3xl backdrop-blur-md w-full max-w-sm shadow-xl">
        <h1 className="text-center text-3xl font-semibold mb-6">Login</h1>
        <div className="space-y-6">
          <div className="flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300">
            <FaUserCircle className="text-xl text-white" /> {/* Updated icon */}
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-transparent flex-1 outline-none placeholder-white text-white pl-4"
            />
          </div>

          <div className="flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300">
            <RiLock2Fill className="text-xl text-white" />
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              required
              className="bg-transparent flex-1 outline-none placeholder-white text-white pl-4"
            />
            <div onClick={togglePassword} className="cursor-pointer">
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-xl text-white" />
              ) : (
                <AiOutlineEye className="text-xl text-white" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-white accent-white"
              id="user-check"
            />
            <label htmlFor="user-check" className="text-white">
              Remember me
            </label>
          </div>

          <a href="#" className="hover:underline text-white">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-full font-medium mt-6 hover:bg-blue-500 transition duration-300"
        >
          Login
        </button>

        <div className="flex justify-center gap-1 text-center text-sm mt-4 text-white">
          Don't have an account?
          <a href="#" className="font-medium hover:underline">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
