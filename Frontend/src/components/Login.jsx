import React, { useState, useEffect } from 'react';
import '@fontsource/poppins';
import { RiLock2Fill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/features/userSlice';
import bg from '../assets/background.png';
import svg from '../assets/sign-in.svg';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
      setRememberMe(true);
    }
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user.username || !user.password) {
      showToast('Please fill in all fields!', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/login',
        {
          username: user.username,
          password: user.password
        },
        { withCredentials: true }
      );

      showToast(response.data.message || 'Login successful!', 'success');
      setUser({ username: '', password: '' });

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }

      navigate('/');

      dispatch(setAuthUser(response.data));
    } catch (error) {
      console.error(error);
      showToast(error?.response?.data?.message || 'Something went wrong!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMeChange = e => {
    setRememberMe(e.target.checked);
  };

  const showToast = (message, type) => {
    const customToastStyle = {
      backgroundColor: type === 'success' ? '#4CAF50' : '#FF5733',
      color: 'white',
      borderRadius: '10px',
      padding: '10px 20px',
      fontWeight: 'bold'
    };

    toast(<div style={customToastStyle}>{message}</div>, {
      type: type === 'success' ? 'success' : 'error',
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark'
    });
  };

  return (
    <>
      <div className='font-poppins h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden'>
        {/* Background Animation */}
        <img
          src={bg}
          className='absolute inset-0 w-full h-full object-cover opacity-20'
          alt='Background'
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
        </div>

        {/* Login Box */}
        <div className='bg-white/10 border-2 border-white/20 rounded-3xl backdrop-blur-md shadow-2xl animate-fade-in mx-4 w-full max-w-4xl overflow-hidden flex flex-col lg:flex-row relative'>
          {/* Left Side: Illustration */}
          <div className='w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center'>
            <img src={svg} className='w-80 lg:w-96' alt='' />
          </div>

          {/* Right Side: Login Form */}
          <div className='w-full lg:w-1/2 p-8 lg:p-12 text-white'>
            <h1 className='text-center text-3xl lg:text-4xl font-bold mb-6 lg:mb-8'>
              Welcome Back!
            </h1>

            {/* Username Input */}
            <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'>
              <FaUserCircle className='text-xl lg:text-2xl text-white' />
              <input
                type='text'
                name='username'
                placeholder='Username'
                required
                autoComplete='off'
                className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-base lg:text-lg'
                value={user.username}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'>
              <RiLock2Fill className='text-xl lg:text-2xl text-white' />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                required
                autoComplete='off'
                className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 text-base lg:text-lg'
                value={user.password}
                onChange={handleChange}
              />
              <div onClick={togglePassword} className='cursor-pointer'>
                {showPassword ? (
                  <AiOutlineEyeInvisible className='text-xl lg:text-2xl text-white' />
                ) : (
                  <AiOutlineEye className='text-xl lg:text-2xl text-white' />
                )}
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className='flex justify-between items-center mt-4 lg:mt-6 text-sm lg:text-lg'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  className='w-4 h-4 lg:w-5 lg:h-5 text-white accent-white'
                  id='user-check'
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label htmlFor='user-check' className='text-white'>
                  Remember me
                </label>
              </div>

              <a href='#' className='hover:underline text-white'>
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type='submit'
              className='w-full py-3 lg:py-4 bg-blue-600 text-white rounded-full font-medium mt-6 lg:mt-8 hover:bg-blue-500 transition duration-300 text-lg lg:text-xl'
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Register Link */}
            <div className='flex justify-center gap-1 text-center text-sm lg:text-lg mt-4 lg:mt-6 text-white'>
              Don't have an account?
              <Link to='/signup' className='font-medium hover:underline'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
