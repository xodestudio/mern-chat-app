import { useEffect, useState } from 'react';
import {
  FaTimes,
  FaSave,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaAlignLeft,
  FaVenusMars
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/features/userSlice';
import { motion } from 'framer-motion';

const EditProfile = ({ onClose }) => {
  const { authUser } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    fullName: authUser?.data?.user?.fullName || '',
    username: authUser?.data?.user?.username || '',
    email: authUser?.data?.user?.email || '',
    age: authUser?.data?.user?.age || '',
    password: '',
    avatar: authUser?.data?.user?.avatar || '',
    coverPhoto: authUser?.data?.user?.coverPhoto || '',
    description: authUser?.data?.user?.description || '',
    gender: authUser?.data?.user?.gender || ''
  });
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      fullName: authUser?.data?.user?.fullName || '',
      username: authUser?.data?.user?.username || '',
      email: authUser?.data?.user?.email || '',
      age: authUser?.data?.user?.age || '',
      password: '',
      avatar: authUser?.data?.user?.avatar || '',
      coverPhoto: authUser?.data?.user?.coverPhoto || '',
      description: authUser?.data?.user?.description || '',
      gender: authUser?.data?.user?.gender || ''
    });
  }, [authUser]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files && files.length > 0 ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      });

      const response = await axios.put(
        'http://localhost:8000/api/v1/users/edit-profile',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        dispatch(
          setAuthUser({
            data: {
              user: response.data.data
            }
          })
        );
        onClose();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className='h-full w-full bg-gray-900/95 backdrop-blur-lg p-6 overflow-y-auto'
    >
      {/* Close Icon */}
      <button
        onClick={onClose}
        className='absolute top-6 right-6 text-gray-300 hover:text-white transition-colors bg-gray-800/50 rounded-full p-3 shadow-lg'
      >
        <FaTimes className='text-xl' />
      </button>

      {/* Edit Profile Form */}
      <form onSubmit={handleSubmit} className='flex flex-col h-full justify-between'>
        <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-8 text-center'>
          Edit Profile
        </h2>

        {/* Cover Photo Upload */}
        <div className='relative mb-8'>
          <motion.div
            className='w-full h-48 rounded-lg bg-gray-800/70 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-gray-700 shadow-lg'
            style={{
              backgroundImage:
                formData.coverPhoto instanceof File
                  ? `url(${URL.createObjectURL(formData.coverPhoto)})`
                  : `url(${
                      authUser?.data?.user?.coverPhoto ||
                      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    })`,
              backgroundSize: 'cover'
            }}
            whileHover={{
              borderColor: '#3B82F6',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.7)'
            }}
            transition={{ duration: 0.3 }}
          >
            <label className='cursor-pointer p-3 bg-gray-900/70 rounded-full hover:bg-gray-800/80 transition duration-300'>
              <FaCamera className='text-xl text-gray-300' />
              <input type='file' name='coverPhoto' onChange={handleChange} className='hidden' />
            </label>
          </motion.div>
        </div>

        {/* Profile Photo Upload */}
        <div className='flex justify-center -mt-16 mb-8'>
          <motion.div
            className='relative'
            whileHover={{
              borderColor: '#3B82F6',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.7)',
              borderRadius: '100rem'
            }}
            transition={{ duration: 0.3 }}
          >
            <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-gray-800'>
              <img
                src={
                  formData.avatar instanceof File
                    ? URL.createObjectURL(formData.avatar)
                    : authUser?.data?.user?.avatar
                }
                alt='Profile'
                className='w-full h-full object-cover object-top'
              />
            </div>
            <label className='absolute bottom-2 right-2 cursor-pointer p-2 bg-gray-900/70 rounded-full hover:bg-gray-800/80 transition duration-300'>
              <FaCamera className='text-lg text-gray-300' />
              <input type='file' name='avatar' onChange={handleChange} className='hidden' />
            </label>
          </motion.div>
        </div>

        {/* Input Fields */}
        <div className='flex flex-wrap justify-between gap-x-6 sm:gap-x-2'>
          {/* Full Name */}
          <motion.div
            className='w-full sm:w-[48%] mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='flex items-center'>
              <FaUser className='mr-2 text-blue-400' />
              <label className='block text-gray-300 text-sm mb-2 leading-[3rem] h-10'>
                Full Name
              </label>
            </div>
            <input
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              autoComplete='off'
              className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
              placeholder='Enter your full name'
            />
          </motion.div>

          {/* Username */}
          <motion.div
            className='w-full sm:w-[48%] mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className='flex items-center'>
              <FaUser className='mr-2 text-green-400' />
              <label className='block text-gray-300 text-sm mb-2 leading-[3rem] h-10'>
                Username
              </label>
            </div>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              autoComplete='off'
              className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
              placeholder='Enter your username'
            />
          </motion.div>

          {/* Age */}
          <motion.div
            className='w-full sm:w-[48%] mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className='flex items-center'>
              <FaEnvelope className='mr-2 text-yellow-400' />
              <label className='block text-gray-300 text-sm mb-2 leading-[3rem] h-10'>Age</label>
            </div>
            <input
              type='number'
              name='age'
              value={formData.age}
              onChange={handleChange}
              autoComplete='off'
              className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
              placeholder='Enter your age'
            />
          </motion.div>

          {/* Gender */}
          <motion.div
            className='w-full sm:w-[48%] mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className='flex items-center'>
              <FaVenusMars className='mr-2 text-purple-400' />
              <label className='block text-gray-300 text-sm mb-2 leading-[3rem] h-10'>Gender</label>
            </div>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
            >
              <option value='' disabled className='text-white' hidden>
                Select your gender
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='custom'>Custom</option>
            </select>
          </motion.div>

          {/* Password */}
          <motion.div
            className='w-full sm:w-[48%] mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className='flex items-center'>
              <FaLock className='mr-2 text-red-400' />
              <label className='block text-gray-300 text-sm mb-2 leading-[3rem] h-10'>
                Old Password
              </label>
            </div>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              autoComplete='off'
              className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
              placeholder='Enter a old password'
            />
          </motion.div>

          {/* New Password */}
          <motion.div
            className='w-full sm:w-[48%] mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className='flex items-center'>
              <FaLock className='mr-2 text-red-400' />
              <label className='block text-gray-300 text-sm mb-2 leading-[3rem] h-10'>
                New Password
              </label>
            </div>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              autoComplete='off'
              className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
              placeholder='Enter a new password'
            />
          </motion.div>

          {/* Description */}
          <motion.div
            className='w-full mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className='flex items-center'>
              <FaAlignLeft className='mr-2 text-teal-400' />
              <label className='block text-gray-300 text-sm mb-2 leading-[3rem] h-10'>
                Description
              </label>
            </div>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              rows='3'
              className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none'
              placeholder='Tell us about yourself...'
            ></textarea>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.button
          type='submit'
          disabled={isSubmitting}
          whileTap={{ scale: 0.98 }}
          className='mt-auto w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center'
        >
          {isSubmitting ? (
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
          ) : (
            <>
              <FaSave className='mr-2' /> Save Changes
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EditProfile;
