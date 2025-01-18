import React, { useState } from "react";
import "@fontsource/poppins";
import { RiMailFill, RiLock2Fill, RiUser3Fill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility

  const togglePassword = () => {
    setShowPassword(!showPassword); // Toggle the visibility of password
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle the visibility of confirm password
  };

  return (
    <div className="font-poppins h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-blue-900">
      <form className="bg-white/20 border-2 border-white/70 p-8 text-white rounded-3xl backdrop-blur-md w-full max-w-lg shadow-xl">
        <h1 className="text-center text-3xl font-semibold mb-6">Signup</h1>
        <div className="space-y-6">
          <div className="flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300">
            <RiUser3Fill className="text-xl text-white" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="bg-transparent flex-1 outline-none placeholder-white text-white pl-4"
            />
          </div>

          <div className="flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300">
            <RiMailFill className="text-xl text-white" />
            <input
              type="text"
              placeholder="Username"
              required
              className="bg-transparent flex-1 outline-none placeholder-white text-white pl-4"
            />
          </div>

          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                className="w-5 h-5 text-blue-500 accent-blue-500"
              />
              <label htmlFor="male" className="ml-2 text-white">
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                className="w-5 h-5 text-pink-500 accent-pink-500"
              />
              <label htmlFor="female" className="ml-2 text-white">
                Female
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="others"
                name="gender"
                value="others"
                className="w-5 h-5 text-purple-500 accent-purple-500"
              />
              <label htmlFor="others" className="ml-2 text-white">
                Others
              </label>
            </div>
          </div>

          <div className="flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300">
            <input
              type="Number"
              placeholder="Age"
              required
              className="bg-transparent flex-1 outline-none placeholder-white text-white pl-4"
            />
          </div>

          <div className="flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300">
            <input
              type="file"
              id="file-upload"
              required
              className="bg-transparent flex-1 outline-none placeholder-white text-white file:py-3 file:px-5 file:bg-white/10 file:border-2 file:border-white/70 file:rounded-full file:text-white file:cursor-pointer hover:file:bg-white/20 transition duration-300"
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

          <div className="flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300">
            <RiLock2Fill className="text-xl text-white" />
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Confirm Password"
              required
              className="bg-transparent flex-1 outline-none placeholder-white text-white pl-4"
            />
            <div onClick={toggleConfirmPassword} className="cursor-pointer">
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className="text-xl text-white" />
              ) : (
                <AiOutlineEye className="text-xl text-white" />
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-full font-medium mt-6 hover:bg-blue-500 transition duration-300"
        >
          Register
        </button>

        <div className="flex justify-center gap-1 text-center text-sm mt-4 text-white">
          Already have an account?
          <a href="#" className="font-medium hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
