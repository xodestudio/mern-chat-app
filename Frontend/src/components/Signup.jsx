import React, { useState, useRef } from 'react';
import '@fontsource/poppins';
import { RiMailFill, RiLock2Fill, RiUser3Fill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import svg from '../assets/undraw.svg';
import bg from '../assets/background.png';

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

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: name === 'avatar' ? files[0] : value
    }));
  };

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: '', type: '', visible: false }), 3000);
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
      <img
        src={bg}
        alt='Background'
        className='absolute inset-0 w-full h-full object-cover opacity-20'
      />

      {/* Custom Toast */}
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-xl
      backdrop-blur-lg bg-opacity-90 shadow-2xl
      ${
        toast.type === 'error' ? 'bg-red-500/80 border-red-400' : 'bg-green-500/80 border-green-400'
      }
      border-2 text-white
      transform transition-all duration-500
      hover:translate-y-1 hover:shadow-lg
      flex items-center gap-4 min-w-[350px]
      animate-[slideInBounce_0.5s_ease-out]
      overflow-hidden
      ${toast.type === 'error' ? 'shadow-red-500/30' : 'shadow-green-500/30'}`}
        >
          {/* Progress Bar */}
          <div className='absolute bottom-0 left-0 h-1 bg-white/30 w-full'>
            <div className='h-full bg-white/60 animate-[progress_3s_linear]' />
          </div>

          {/* Icon */}
          <div
            className={`rounded-full p-2 
      ${toast.type === 'error' ? 'bg-red-600/50' : 'bg-green-600/50'}`}
          >
            {toast.type === 'error' ? (
              <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className='flex-1'>
            <h4 className='font-bold text-lg tracking-wide'>
              {toast.type === 'error' ? 'Error' : 'Success'}
            </h4>
            <p className='text-sm text-white/90'>{toast.message}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setToast(prev => ({ ...prev, visible: false }))}
            className='rounded-full p-1 hover:bg-white/20 
        transition-colors duration-200'
          >
            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      )}

      {/* Signup Box */}
      <div className='bg-white/10 border-2 border-white/20 rounded-3xl backdrop-blur-md shadow-2xl animate-fade-in mx-4 w-full max-w-6xl overflow-hidden flex flex-col lg:flex-row'>
        {/* Left Side: SVG Illustration */}
        <div className='w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center'>
          <img src={svg} alt='Signup' className='w-full max-w-md' />
        </div>

        {/* Right Side: Signup Form */}
        <div className='w-full lg:w-1/2 p-8 lg:p-12 text-white'>
          <h1 className='text-center text-3xl lg:text-4xl font-bold mb-6 lg:mb-8'>Sign Up</h1>

          {/* Full Name Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'>
            <RiUser3Fill className='text-xl lg:text-2xl text-white' />
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              value={user.fullName}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-base lg:text-lg'
            />
          </div>

          {/* Username Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'>
            <RiMailFill className='text-xl lg:text-2xl text-white' />
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={user.username}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-base lg:text-lg'
            />
          </div>

          {/* Gender Selection */}
          <div className='flex items-center space-x-6 m-4'>
            {['male', 'female', 'others'].map(gender => (
              <div key={gender} className='flex items-center'>
                <input
                  type='radio'
                  id={gender}
                  name='gender'
                  value={gender}
                  checked={user.gender === gender}
                  onChange={handleChange}
                  className={`w-5 h-5 ${
                    gender === 'male'
                      ? 'text-blue-500 accent-blue-500'
                      : gender === 'female'
                      ? 'text-pink-500 accent-pink-500'
                      : 'text-purple-500 accent-purple-500'
                  }`}
                />
                <label htmlFor={gender} className='ml-2 text-white capitalize'>
                  {gender}
                </label>
              </div>
            ))}
          </div>

          {/* Age Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'>
            <input
              type='number'
              name='age'
              placeholder='Age'
              value={user.age}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-base lg:text-lg'
            />
          </div>

          {/* Avatar Upload */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'>
            <input
              type='file'
              name='avatar'
              ref={avatarInputRef}
              required
              onChange={handleChange}
              className='bg-transparent flex-1 outline-none placeholder-white text-white file:py-3 file:px-5 file:bg-white/10 file:border-2 file:border-white/20 file:rounded-full file:text-white file:cursor-pointer hover:file:bg-white/20 transition duration-300'
            />
          </div>

          {/* Password Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'>
            <RiLock2Fill className='text-xl lg:text-2xl text-white' />
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              value={user.password}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-base lg:text-lg'
            />
            <div onClick={togglePassword} className='cursor-pointer'>
              {showPassword ? (
                <AiOutlineEyeInvisible className='text-xl lg:text-2xl text-white' />
              ) : (
                <AiOutlineEye className='text-xl lg:text-2xl text-white' />
              )}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'>
            <RiLock2Fill className='text-xl lg:text-2xl text-white' />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm Password'
              value={user.confirmPassword}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-base lg:text-lg'
            />
            <div onClick={toggleConfirmPassword} className='cursor-pointer'>
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className='text-xl lg:text-2xl text-white' />
              ) : (
                <AiOutlineEye className='text-xl lg:text-2xl text-white' />
              )}
            </div>
          </div>

          {/* Signup Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 lg:py-4 bg-blue-600 text-white rounded-full font-medium mt-6 lg:mt-8 hover:bg-blue-500 transition duration-300 text-lg lg:text-xl'
            onClick={handleSubmit}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {/* Login Link */}
          <div className='flex justify-center gap-1 text-center text-sm lg:text-lg mt-4 lg:mt-6 text-white'>
            Already have an account?
            <Link to='/login' className='font-medium hover:underline'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
