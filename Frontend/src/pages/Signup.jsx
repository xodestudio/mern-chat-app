import { useState, useRef, useCallback } from 'react';
import '@fontsource/poppins';
import { RiMailFill, RiLock2Fill, RiUser3Fill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  // Show Default Toast Notifications
  const showToast = useCallback((message, type) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }, []);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='font-poppins h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-slate-900 relative overflow-hidden'
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/040/890/255/non_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg')] bg-cover bg-center opacity-50"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      ></motion.div>

      {/* Floating Circles Animation */}
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

      {/* Toast Container */}
      <ToastContainer />

      {/* Signup Box */}
      <motion.div
        className='bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg mx-4 w-full max-w-sm p-6 text-white'
        whileHover={{ boxShadow: '0 10px 20px rgba(255, 255, 255, 0.1)' }}
        transition={{ duration: 0.3 }}
      >
        <h1 className='text-center text-xl font-bold mb-4 text-white'>Sign Up</h1>

        {/* Full Name Input */}
        <motion.div
          className='flex items-center border border-white/20 px-4 py-2 rounded-full mb-3 focus-within:border-blue-500 transition duration-300'
          whileHover={{ borderColor: '#4CAF50' }}
        >
          <RiUser3Fill className='text-lg text-white' />
          <input
            type='text'
            name='fullName'
            placeholder='Full Name'
            required
            autoComplete='off'
            className='bg-transparent flex-1 outline-none placeholder-white text-white pl-3 text-sm'
            value={user.fullName}
            onChange={handleChange}
            aria-label='Full Name'
          />
        </motion.div>

        {/* Username Input */}
        <motion.div
          className='flex items-center border border-white/20 px-4 py-2 rounded-full mb-3 focus-within:border-blue-500 transition duration-300'
          whileHover={{ borderColor: '#FF5733' }}
        >
          <RiMailFill className='text-lg text-white' />
          <input
            type='text'
            name='username'
            placeholder='Username'
            required
            autoComplete='off'
            className='bg-transparent flex-1 outline-none placeholder-white text-white pl-3 text-sm'
            value={user.username}
            onChange={handleChange}
            aria-label='Username'
          />
        </motion.div>

        {/* Gender Selection */}
        <div className='flex justify-around items-center mb-3 text-xs'>
          {['male', 'female', 'others'].map(gender => (
            <label key={gender} className='flex items-center space-x-1'>
              <input
                type='radio'
                name='gender'
                value={gender}
                checked={user.gender === gender}
                onChange={handleChange}
                className='w-4 h-4 text-white accent-white'
              />
              <span className='text-white'>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
            </label>
          ))}
        </div>

        {/* Age Input */}
        <motion.div
          className='flex items-center border border-white/20 px-4 py-2 rounded-full mb-3 focus-within:border-blue-500 transition duration-300'
          whileHover={{ borderColor: '#FFC107' }}
        >
          <RiUser3Fill className='text-lg text-white' />
          <input
            type='number'
            name='age'
            placeholder='Age'
            required
            autoComplete='off'
            className='bg-transparent flex-1 outline-none placeholder-white text-white pl-3 text-sm'
            value={user.age}
            onChange={handleChange}
            aria-label='Age'
          />
        </motion.div>

        {/* Avatar Upload */}
        <motion.div
          className='flex items-center border border-white/20 px-4 py-2 rounded-full mb-3 focus-within:border-blue-500 transition duration-300'
          whileHover={{ borderColor: '#673AB7' }}
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
              className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full hover:from-blue-700 hover:to-indigo-700 transition duration-300'
            >
              Choose File
            </button>
            {user.avatar && (
              <span className='ml-2 text-xs text-white truncate'>
                {user.avatar.name.slice(0, 15)}...
              </span>
            )}
          </div>
        </motion.div>

        {/* Password Input */}
        <motion.div
          className='flex items-center border border-white/20 px-4 py-2 rounded-full mb-3 focus-within:border-blue-500 transition duration-300'
          whileHover={{ borderColor: '#E91E63' }}
        >
          <RiLock2Fill className='text-lg text-white' />
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            required
            autoComplete='off'
            className='bg-transparent flex-1 outline-none placeholder-white text-white pl-3 text-sm'
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

        {/* Confirm Password Input */}
        <motion.div
          className='flex items-center border border-white/20 px-4 py-2 rounded-full mb-3 focus-within:border-blue-500 transition duration-300'
          whileHover={{ borderColor: '#9C27B0' }}
        >
          <RiLock2Fill className='text-lg text-white' />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm Password'
            required
            autoComplete='off'
            className='bg-transparent flex-1 outline-none placeholder-white text-white pl-3 text-sm'
            value={user.confirmPassword}
            onChange={handleChange}
            aria-label='Confirm Password'
          />
          <div onClick={toggleConfirmPassword} className='cursor-pointer'>
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible className='text-lg text-white' />
            ) : (
              <AiOutlineEye className='text-lg text-white' />
            )}
          </div>
        </motion.div>

        {/* Signup Button */}
        <motion.button
          type='submit'
          className='w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium mt-3 hover:from-blue-700 hover:to-indigo-700 transition duration-300 text-xs shadow-lg'
          disabled={loading}
          onClick={handleSubmit}
          aria-label='Sign Up'
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
              Signing Up...
            </div>
          ) : (
            'Sign Up'
          )}
        </motion.button>

        {/* Login Link */}
        <div className='flex justify-center gap-1 text-center text-xs mt-3 text-white'>
          Already have an account?
          <motion.span whileHover={{ scale: 1.05 }}>
            <Link to='/login' className='font-medium hover:underline' aria-label='Login'>
              Login
            </Link>
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
