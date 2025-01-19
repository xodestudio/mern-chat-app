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
      <div className='font-poppins h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-blue-900'>
        <form
          className='bg-white/20 border-2 border-white/70 p-8 text-white rounded-3xl backdrop-blur-md w-full max-w-sm shadow-xl'
          onSubmit={handleSubmit}
        >
          <h1 className='text-center text-3xl font-semibold mb-6'>Login</h1>
          <div className='space-y-6'>
            <div className='flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300'>
              <FaUserCircle className='text-xl text-white' />
              <input
                type='text'
                name='username'
                placeholder='Username'
                required
                autoComplete='off'
                className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4'
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div className='flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300'>
              <RiLock2Fill className='text-xl text-white' />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                required
                autoComplete='off'
                className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4'
                value={user.password}
                onChange={handleChange}
              />
              <div onClick={togglePassword} className='cursor-pointer'>
                {showPassword ? (
                  <AiOutlineEyeInvisible className='text-xl text-white' />
                ) : (
                  <AiOutlineEye className='text-xl text-white' />
                )}
              </div>
            </div>
          </div>

          <div className='flex justify-between items-center mt-4 text-sm'>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                className='w-4 h-4 text-white accent-white'
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

          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white rounded-full font-medium mt-6 hover:bg-blue-500 transition duration-300'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className='flex justify-center gap-1 text-center text-sm mt-4 text-white'>
            Don't have an account?
            <Link to='/signup' className='font-medium hover:underline'>
              Register
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
