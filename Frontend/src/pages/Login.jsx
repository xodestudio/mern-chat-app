import { useState, useEffect, useCallback } from 'react';
import '@fontsource/poppins';
import { RiLock2Fill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/features/userSlice';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setRememberMe(true);
    }
  }, []);

  const togglePassword = useCallback(() => setShowPassword(prev => !prev), []);
  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleRememberMeChange = useCallback(e => {
    setRememberMe(e.target.checked);
  }, []);

  const showToast = useCallback((message, type) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark'
    });
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const { username, password } = user;

      if (!username || !password) {
        showToast('Please fill in all fields!', 'error');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:8000/api/v1/users/login',
          { username, password },
          { withCredentials: true }
        );

        showToast(response.data.message || 'Login successful!', 'success');

        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }

        dispatch(setAuthUser(response.data));
        navigate('/');
      } catch (error) {
        console.error(error);
        showToast(error?.response?.data?.message || 'Something went wrong!', 'error');
      } finally {
        setLoading(false);
      }
    },
    [user, rememberMe, dispatch, navigate, showToast]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='font-poppins h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-slate-900 relative overflow-hidden'
    >
      {/* Background Image Animation */}
      <motion.div
        className='absolute inset-0 bg-[url(https://static.vecteezy.com/system/resources/previews/040/890/255/non_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg)] bg-cover bg-center opacity-50'
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating Circles */}
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {[1, 2, 3].map(index => (
          <motion.div
            key={index}
            className={`absolute rounded-full blur-3xl ${
              index === 1 ? 'bg-blue-500/10' : index === 2 ? 'bg-purple-500/10' : 'bg-green-500/10'
            }`}
            style={{ width: `${index * 6}rem`, height: `${index * 6}rem` }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </motion.div>

      <ToastContainer />

      {/* Login Box */}
      <motion.div
        className='bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg w-full max-w-3xl overflow-hidden flex flex-col md:flex-row relative z-10'
        whileHover={{ boxShadow: '0 10px 20px rgba(255, 255, 255, 0.1)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Left Side Image */}
        <motion.div
          className='hidden md:block w-full lg:w-1/2 p-8 lg:p-12 lg:pr-0 items-center justify-center'
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src='https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--account-password-security-lock-design-development-illustrations-2757111.png?f=webp'
            alt='Illustration'
            className='w-full sm:w-64 md:w-72 lg:w-80 object-contain'
          />
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          className='w-full lg:w-1/2 p-8 lg:p-12 lg:pl-0 text-white flex flex-col justify-evenly'
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className='text-center text-[1.8rem]/[1.75rem] font-bold mb-4 lg:mb-8'>
            Welcome Back!
          </h1>

          {/* Username */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 py-2 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-3'
            whileHover={{ borderColor: '#4CAF50' }}
          >
            <FaUserCircle className='text-lg text-white' />
            <input
              type='text'
              name='username'
              placeholder='Username'
              required
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-3 text-sm/[1.8rem]'
              value={user.username}
              onChange={handleChange}
              aria-label='Username'
            />
          </motion.div>

          {/* Password */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 py-2 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-3'
            whileHover={{ borderColor: '#FF5733' }}
          >
            <RiLock2Fill className='text-lg text-white' />
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              required
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-3 text-sm/[1.8rem]'
              value={user.password}
              onChange={handleChange}
              aria-label='Password'
            />
            <div onClick={togglePassword} className='cursor-pointer'>
              {showPassword ? (
                <AiOutlineEyeInvisible className='text-lg text-white' />
              ) : (
                <AiOutlineEye className='text-lg text-white' />
              )}
            </div>
          </motion.div>

          {/* Remember Me */}
          <div className='flex justify-between items-center text-[0.8rem]/[1rem]'>
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

          {/* Submit Button */}
          <motion.button
            type='submit'
            className='w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium mt-4 hover:from-blue-700 hover:to-indigo-700 transition duration-300 text-sm/[1.75rem] shadow-lg'
            disabled={loading}
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <svg className='animate-spin h-5 w-5 mr-2 text-white' viewBox='0 0 24 24'>
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
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                  />
                </svg>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </motion.button>

          {/* Register Link */}
          <div className='flex justify-center gap-1 text-center text-xs mt-3 text-white'>
            Don&apos;t have an account?
            <Link
              to='/signup'
              className='font-medium hover:underline'
              aria-label='Register'
              whileHover={{ scale: 1.05 }}
            >
              Register
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
