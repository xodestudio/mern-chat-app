import React, { useState, useRef } from 'react';
import '@fontsource/poppins';
import { RiMailFill, RiLock2Fill, RiUser3Fill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axiosInstance from '../axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../assets/signup.jpg';
import { motion } from 'framer-motion';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    gender: '',
    age: '',
    avatar: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [loading, setLoading] = useState(false);
  const avatarInputRef = useRef(null);
  const navigate = useNavigate();

  // Toggle Password Visibility
  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  // Handle Input Changes
  const handleChange = e => {
    const { name, value, files } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: name === 'avatar' ? files[0] : value
    }));
  };

  // Show Custom Toast Notifications
  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Helper Function to Truncate File Names
  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + '...';
    }
    return fileName;
  };

  // Handle Form Submission
  const handleSubmit = async e => {
    e.preventDefault();
    if (
      !user.fullName ||
      !user.username ||
      !user.gender ||
      !user.age ||
      !user.avatar ||
      !user.password ||
      !user.confirmPassword
    ) {
      showToast('Please fill in all fields!', 'error');
      return;
    }
    if (user.password !== user.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        'http://localhost:8000/api/v1/users/register',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      showToast(response.data.message || 'Signup successful!', 'success');
      setUser({
        fullName: '',
        username: '',
        gender: '',
        age: '',
        avatar: '',
        password: '',
        confirmPassword: ''
      });
      if (avatarInputRef.current) avatarInputRef.current.value = '';
      navigate('/login');
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Something went wrong!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='font-poppins h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden'
    >
      {/* Background Animation */}
      <motion.div
        className='absolute inset-0 bg-[url(https://static.vecteezy.com/system/resources/previews/009/760/750/non_2x/background-with-pieces-of-bubble-liquid-shape-and-gradient-color-free-vector.jpg)] bg-cover bg-center'
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      ></motion.div>
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className='w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        ></motion.div>
      </motion.div>

      {/* Custom Toast */}
      {toast.visible && (
        <motion.div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex items-center space-x-2'>
            {/* Message */}
            <span className='font-medium'>{toast.message}</span>
            {/* Close Button */}
            <button
              onClick={() => setToast(prev => ({ ...prev, visible: false }))}
              className='ml-auto text-white hover:text-gray-200 transition-colors duration-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {/* Signup Box */}
      <motion.div
        className='bg-white/10 border-2 border-white/20 rounded-3xl backdrop-blur-md shadow-2xl mx-4 w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative'
        whileHover={{ boxShadow: '0 10px 30px rgba(0, 123, 255, 0.3)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Left Side: SVG Illustration (Hidden on Mobile) */}
        <motion.div
          className='hidden md:block w-full lg:w-1/2 p-8 lg:p-8 '
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div className='flex items-center justify-center h-[100%]'>
            <img
              src={signupImg}
              alt='Illustration'
              className='w-full sm:w-64 md:w-72 lg:w-80 object-contain'
            />
          </motion.div>
        </motion.div>

        {/* Right Side: Signup Form */}
        <motion.div
          className='w-full lg:w-1/2 p-8 lg:p-8 text-white'
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className='text-center text-xl sm:text-2xl lg:text-4xl font-bold mb-4 lg:mb-8 text-white bg-clip-text'>
            Sign Up
          </h1>

          {/* Full Name Input */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'
            whileHover={{ borderColor: '#4CAF50', boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <RiUser3Fill className='text-lg sm:text-xl lg:text-2xl text-white' />
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              required
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-sm sm:text-base'
              value={user.fullName}
              onChange={handleChange}
              aria-label='Full Name'
            />
          </motion.div>

          {/* Username Input */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'
            whileHover={{ borderColor: '#FF5733', boxShadow: '0 0 10px rgba(255, 87, 51, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <RiMailFill className='text-lg sm:text-xl lg:text-2xl text-white' />
            <input
              type='text'
              name='username'
              placeholder='Username'
              required
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-sm sm:text-base'
              value={user.username}
              onChange={handleChange}
              aria-label='Username'
            />
          </motion.div>

          {/* Gender Selection */}
          <div className='flex justify-evenly items-center mb-4 lg:mb-6 text-xs sm:text-sm lg:text-base'>
            {['male', 'female', 'others'].map(gender => (
              <label key={gender} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='gender'
                  value={gender}
                  checked={user.gender === gender}
                  onChange={handleChange}
                  className='w-4 h-4 text-white accent-white'
                />
                <span className='text-white'>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </span>
              </label>
            ))}
          </div>

          {/* Age Input */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'
            whileHover={{ borderColor: '#FFC107', boxShadow: '0 0 10px rgba(255, 193, 7, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <RiUser3Fill className='text-lg sm:text-xl lg:text-2xl text-white' />
            <input
              type='number'
              name='age'
              placeholder='Age'
              required
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-sm sm:text-base'
              value={user.age}
              onChange={handleChange}
              aria-label='Age'
            />
          </motion.div>

          {/* Avatar Upload */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'
            whileHover={{ borderColor: '#673AB7', boxShadow: '0 0 10px rgba(103, 58, 183, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <div className='flex items-center flex-1 bg-transparent cursor-pointer'>
              <input
                type='file'
                name='avatar'
                accept='image/*'
                ref={avatarInputRef}
                onChange={handleChange}
                className='hidden'
                aria-label='Avatar'
              />
              <button
                type='button'
                onClick={() => avatarInputRef.current && avatarInputRef.current.click()}
                className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base px-4 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition duration-300'
              >
                Choose File
              </button>
              {user.avatar && (
                <span className='ml-4 text-sm sm:text-base text-white truncate'>
                  {truncateFileName(user.avatar.name, 18)}
                </span>
              )}
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'
            whileHover={{ borderColor: '#E91E63', boxShadow: '0 0 10px rgba(233, 30, 99, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <RiLock2Fill className='text-lg sm:text-xl lg:text-2xl text-white' />
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              required
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-sm sm:text-base'
              value={user.password}
              onChange={handleChange}
              aria-label='Password'
            />
            <div onClick={togglePassword} className='cursor-pointer'>
              {showPassword ? (
                <AiOutlineEyeInvisible className='text-lg sm:text-xl lg:text-2xl text-white' />
              ) : (
                <AiOutlineEye className='text-lg sm:text-xl lg:text-2xl text-white' />
              )}
            </div>
          </motion.div>

          {/* Confirm Password Input */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'
            whileHover={{ borderColor: '#9C27B0', boxShadow: '0 0 10px rgba(156, 39, 176, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <RiLock2Fill className='text-lg sm:text-xl lg:text-2xl text-white' />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm Password'
              required
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-sm sm:text-base'
              value={user.confirmPassword}
              onChange={handleChange}
              aria-label='Confirm Password'
            />
            <div onClick={toggleConfirmPassword} className='cursor-pointer'>
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className='text-lg sm:text-xl lg:text-2xl text-white' />
              ) : (
                <AiOutlineEye className='text-lg sm:text-xl lg:text-2xl text-white' />
              )}
            </div>
          </motion.div>

          {/* Signup Button */}
          <motion.button
            type='submit'
            className='w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium mt-6 hover:from-blue-700 hover:to-indigo-700 transition duration-300 text-xs sm:text-sm lg:text-base shadow-lg'
            disabled={loading}
            onClick={handleSubmit}
            aria-label='Sign Up'
            whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <svg
                  className='animate-spin h-5 w-5 mr-2 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8 0-1.103-.291-2.16-.799-3.147l-.001-.003z'
                  ></path>
                </svg>
                Signing Up...
              </div>
            ) : (
              'Sign Up'
            )}
          </motion.button>

          {/* Login Link */}
          <div className='flex justify-center gap-1 text-center text-xs sm:text-sm lg:text-base mt-4 text-white'>
            Already have an account?
            <motion.span whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Link to='/login' className='font-medium hover:underline' aria-label='Login'>
                Login
              </Link>
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
