import React, { useState, useRef } from 'react';
import '@fontsource/poppins';
import { RiMailFill, RiLock2Fill, RiUser3Fill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const avatarInputRef = useRef(null); // File input reset karne ke liye ref

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = e => {
    const { name, value, files } = e.target;

    setUser(prevUser => ({
      ...prevUser,
      [name]: name === 'avatar' ? files[0] : value
    }));
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
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
    formData.append('fullName', user.fullName);
    formData.append('username', user.username);
    formData.append('gender', user.gender);
    formData.append('age', user.age);
    formData.append('avatar', user.avatar);
    formData.append('password', user.password);
    formData.append('confirmPassword', user.confirmPassword);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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

      if (avatarInputRef.current) {
        avatarInputRef.current.value = '';
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data?.message || 'Something went wrong!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-poppins h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-blue-900 relative'>
      {toast && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-medium ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } shadow-lg`}
        >
          {toast.message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='bg-white/20 border-2 border-white/70 p-8 text-white rounded-3xl backdrop-blur-md w-full max-w-lg shadow-xl'
      >
        <h1 className='text-center text-3xl font-semibold mb-6'>Signup</h1>
        <div className='space-y-6'>
          <div className='flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300'>
            <RiUser3Fill className='text-xl text-white' />
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              value={user.fullName}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 focus:bg-transparent'
            />
          </div>

          <div className='flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300'>
            <RiMailFill className='text-xl text-white' />
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={user.username}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 focus:bg-transparent'
            />
          </div>

          <div className='flex items-center space-x-6 mt-4'>
            <div className='flex items-center'>
              <input
                type='radio'
                id='male'
                name='gender'
                value='male'
                checked={user.gender === 'male'}
                onChange={handleChange}
                className='w-5 h-5 text-blue-500 accent-blue-500'
              />
              <label htmlFor='male' className='ml-2 text-white'>
                Male
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type='radio'
                id='female'
                name='gender'
                value='female'
                checked={user.gender === 'female'}
                onChange={handleChange}
                className='w-5 h-5 text-pink-500 accent-pink-500'
              />
              <label htmlFor='female' className='ml-2 text-white'>
                Female
              </label>
            </div>
            <div className='flex items-center'>
              <input
                type='radio'
                id='others'
                name='gender'
                value='others'
                checked={user.gender === 'others'}
                onChange={handleChange}
                className='w-5 h-5 text-purple-500 accent-purple-500'
              />
              <label htmlFor='others' className='ml-2 text-white'>
                Others
              </label>
            </div>
          </div>

          <div className='flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300'>
            <input
              type='number'
              name='age'
              placeholder='Age'
              value={user.age}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 focus:bg-transparent'
            />
          </div>

          <div className='flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300'>
            <input
              type='file'
              name='avatar'
              ref={avatarInputRef} // Ref assign karna
              required
              onChange={handleChange}
              className='bg-transparent flex-1 outline-none placeholder-white text-white file:py-3 file:px-5 file:bg-white/10 file:border-2 file:border-white/70 file:rounded-full file:text-white file:cursor-pointer hover:file:bg-white/20 transition duration-300'
            />
          </div>

          <div className='flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300'>
            <RiLock2Fill className='text-xl text-white' />
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              value={user.password}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 focus:bg-transparent'
            />
            <div onClick={togglePassword} className='cursor-pointer'>
              {showPassword ? (
                <AiOutlineEyeInvisible className='text-xl text-white' />
              ) : (
                <AiOutlineEye className='text-xl text-white' />
              )}
            </div>
          </div>

          <div className='flex items-center border-2 border-white/70 px-4 py-3 rounded-full hover:border-blue-500 focus-within:border-blue-500 transition duration-300'>
            <RiLock2Fill className='text-xl text-white' />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm Password'
              value={user.confirmPassword}
              required
              onChange={handleChange}
              autoComplete='off'
              className='bg-transparent flex-1 outline-none placeholder-white text-white pl-4 focus:bg-transparent'
            />
            <div onClick={toggleConfirmPassword} className='cursor-pointer'>
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className='text-xl text-white' />
              ) : (
                <AiOutlineEye className='text-xl text-white' />
              )}
            </div>
          </div>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 bg-blue-600 text-white rounded-full font-medium mt-6 hover:bg-blue-500 transition duration-300'
        >
          {loading ? 'Submitting...' : 'Register'}
        </button>

        <div className='flex justify-center gap-1 text-center text-sm mt-4 text-white'>
          Already have an account?
          <Link to='/login' className='font-medium hover:underline'>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
