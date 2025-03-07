import React, { useState, useRef } from 'react';
import '@fontsource/poppins';
import { RiMailFill, RiLock2Fill, RiUser3Fill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../assets/signup.jpg';

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

  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: name === 'avatar' ? files[0] : value
    }));
  };

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Helper function to truncate file names
  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + '...';
    }
    return fileName;
  };

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
      const response = await axios.post('http://localhost:8000/api/v1/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

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
    <div className='font-poppins h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/009/760/750/non_2x/background-with-pieces-of-bubble-liquid-shape-and-gradient-color-free-vector.jpg)`
        }}
      ></div>

      {/* Blur Effect */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
      </div>

      {/* Custom Toast */}
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } animate-slide-in-out`}
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
        </div>
      )}

      {/* Signup Box */}
      <div className='bg-white/10 border-2 border-white/20 rounded-3xl backdrop-blur-md shadow-2xl animate-fade-in mx-4 w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative'>
        {/* Left Side: SVG Illustration (Hidden on Mobile) */}
        <div className='hidden md:block w-full lg:w-1/2 p-8 lg:p-8 items-center justify-center'>
          <div className='w-full h-[100%] flex items-center justify-center'>
            <img
              src={signupImg}
              alt='Illustration'
              className='w-full sm:w-64 md:w-72 lg:w-80 object-contain'
            />
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className='w-full lg:w-1/2 p-8 lg:p-8 text-white'>
          <h1 className='text-center text-xl sm:text-2xl lg:text-4xl font-bold mb-4 lg:mb-8'>
            Sign Up
          </h1>

          {/* Full Name Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'>
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
          </div>

          {/* Username Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'>
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
          </div>

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
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'>
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
          </div>

          {/* Avatar Upload */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'>
            {/* Custom File Input Container */}
            <div className='flex items-center flex-1 bg-transparent cursor-pointer'>
              {/* Hidden File Input */}
              <input
                type='file'
                name='avatar'
                accept='image/*'
                ref={avatarInputRef}
                onChange={handleChange}
                className='hidden'
                aria-label='Avatar'
              />

              {/* Custom Button for File Input */}
              <button
                type='button'
                onClick={() => avatarInputRef.current && avatarInputRef.current.click()}
                className='bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300'
              >
                Choose File
              </button>

              {/* Display Selected File Name */}
              {user.avatar && (
                <span className='ml-4 text-sm sm:text-base text-white truncate'>
                  {truncateFileName(user.avatar.name, 18)}
                </span>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'>
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
          </div>

          {/* Confirm Password Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4'>
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
          </div>

          {/* Signup Button */}
          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white rounded-full font-medium mt-6 hover:bg-blue-500 transition duration-300 text-xs sm:text-sm lg:text-base'
            disabled={loading}
            onClick={handleSubmit}
            aria-label='Sign Up'
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {/* Login Link */}
          <div className='flex justify-center gap-1 text-center text-xs sm:text-sm lg:text-base mt-4 text-white'>
            Already have an account?
            <Link to='/login' className='font-medium hover:underline' aria-label='Login'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
