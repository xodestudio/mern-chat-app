import { useState, useEffect, useCallback } from 'react';
import '@fontsource/poppins';
import { RiLock2Fill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/features/userSlice';
import axiosInstance from '../axiosInstance.js';
import { motion } from 'framer-motion';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check for refresh token and "Remember Me" on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setRememberMe(true);
    }
  }, []);

  // Toggle password visibility
  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Handle input changes
  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle form submission
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
        const response = await axiosInstance.post(
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
    [user, rememberMe, dispatch, navigate]
  );

  // Handle "Remember Me" checkbox
  const handleRememberMeChange = useCallback(e => {
    setRememberMe(e.target.checked);
  }, []);

  // Show custom toast notifications
  const showToast = useCallback((message, type) => {
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
  }, []);

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

      {/* Login Box */}
      <motion.div
        className='bg-white/10 border-2 border-white/20 rounded-3xl backdrop-blur-md shadow-2xl mx-4 w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative'
        whileHover={{ boxShadow: '0 10px 30px rgba(0, 123, 255, 0.3)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Left Side: Illustration (Hidden on Mobile) */}
        <motion.div
          className='hidden md:block w-full lg:w-1/2 p-8 lg:p-12 items-center justify-center'
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src='https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--account-password-security-lock-design-development-illustrations-2757111.png?f=webp'
            alt='Illustration'
            className='w-full h-[100%] sm:w-64 md:w-72 lg:w-80 object-contain'
          />
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
          className='w-full lg:w-1/2 p-8 lg:p-12 text-white'
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className='text-center text-xl sm:text-2xl lg:text-4xl font-bold mb-4 lg:mb-8'>
            Welcome Back!
          </h1>

          {/* Username Input */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-4 lg:mb-6'
            whileHover={{ borderColor: '#4CAF50', boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)' }}
            transition={{ duration: 0.3 }}
          >
            <FaUserCircle className='text-lg sm:text-xl lg:text-2xl text-white' />
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

          {/* Password Input */}
          <motion.div
            className='flex items-center border-2 border-white/20 px-4 lg:px-6 py-3 lg:py-4 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300 mb-3 lg:mb-6'
            whileHover={{ borderColor: '#FF5733', boxShadow: '0 0 10px rgba(255, 87, 51, 0.5)' }}
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

          {/* Remember Me and Forgot Password */}
          <div className='flex justify-evenly items-center mt-4 lg:mt-6 text-xs sm:text-sm lg:text-base'>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                className='w-4 h-4 text-white accent-white'
                id='user-check'
                checked={rememberMe}
                onChange={handleRememberMeChange}
                aria-label='Remember me'
              />
              <label htmlFor='user-check' className='text-white'>
                Remember me
              </label>
            </div>
            <a href='#' className='hover:underline text-white' aria-label='Forgot Password'>
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <motion.button
            type='submit'
            className='w-full py-3 lg:py-4 bg-blue-600 text-white rounded-full font-medium mt-6 lg:mt-8 hover:bg-blue-500 transition duration-300 text-xs sm:text-sm lg:text-base'
            disabled={loading}
            onClick={handleSubmit}
            aria-label='Login'
            whileHover={{
              boxShadow: '0 0 20px rgba(76, 175, 80, 0.7)',
              background: 'linear-gradient(135deg, #4CAF50, #388E3C)'
            }}
            transition={{ duration: 0.3 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>

          {/* Register Link */}
          <div className='flex justify-center gap-1 text-center text-xs sm:text-sm lg:text-base mt-4 lg:mt-6 text-white'>
            Don't have an account?
            <Link
              to='/signup'
              className='font-medium hover:underline'
              aria-label='Register'
              whileHover={{ color: '#4CAF50' }}
              transition={{ duration: 0.3 }}
            >
              Register
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer />
    </motion.div>
  );
};

export default Login;
