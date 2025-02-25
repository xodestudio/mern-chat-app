import React, { useState } from 'react';
import { FaTimes, FaSave, FaUser, FaEnvelope, FaLock, FaCamera } from 'react-icons/fa';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';

const EditProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: 'Scarlett Davis',
    username: 'scarlettdavis',
    email: 'scarlettdavis@gmail.com',
    password: '',
    profilePhoto: null,
    coverPhoto: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      });

      const response = await axios.put('/users/update-profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
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
    <div className='h-full w-full bg-gray-900/95 backdrop-blur-lg p-6 overflow-y-auto animate-slideInFromRight'>
      {/* Close Icon */}
      <button
        onClick={onClose}
        className='absolute top-6 right-6 text-gray-300 hover:text-white transition-colors bg-gray-800/50 rounded-full p-3'
      >
        <FaTimes className='text-xl' />
      </button>

      {/* Edit Profile Form */}
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto'>
        <h2 className='text-4xl font-bold text-white mb-8 text-center'>Edit Profile</h2>

        {/* Cover Photo Upload */}
        <div className='relative mb-8'>
          <div
            className='w-full h-48 rounded-lg bg-gray-800/70 backdrop-blur-sm flex items-center justify-center overflow-hidden'
            style={{
              backgroundImage: formData.coverPhoto
                ? `url(${URL.createObjectURL(formData.coverPhoto)})`
                : 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <label className='cursor-pointer p-3 bg-gray-900/70 rounded-full hover:bg-gray-800/80 transition duration-300'>
              <FaCamera className='text-xl text-gray-300' />
              <input type='file' name='coverPhoto' onChange={handleChange} className='hidden' />
            </label>
          </div>
        </div>

        {/* Profile Photo Upload */}
        <div className='flex justify-center -mt-16 mb-8'>
          <div className='relative'>
            <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-900 bg-gray-800'>
              <img
                src={
                  formData.profilePhoto
                    ? URL.createObjectURL(formData.profilePhoto)
                    : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
            <label className='absolute bottom-2 right-2 cursor-pointer p-2 bg-gray-900/70 rounded-full hover:bg-gray-800/80 transition duration-300'>
              <FaCamera className='text-lg text-gray-300' />
              <input type='file' name='profilePhoto' onChange={handleChange} className='hidden' />
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div className='mb-6'>
          <label className='block text-gray-300 text-sm mb-2 flex items-center'>
            <FaUser className='mr-2' /> Full Name
          </label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
            placeholder='Enter your full name'
          />
        </div>

        {/* Username */}
        <div className='mb-6'>
          <label className='block text-gray-300 text-sm mb-2 flex items-center'>
            <FaUser className='mr-2' /> Username
          </label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
            placeholder='Enter your username'
          />
        </div>

        {/* Email */}
        <div className='mb-6'>
          <label className='block text-gray-300 text-sm mb-2 flex items-center'>
            <FaEnvelope className='mr-2' /> Email
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
            placeholder='Enter your email'
          />
        </div>

        {/* Password */}
        <div className='mb-8'>
          <label className='block text-gray-300 text-sm mb-2 flex items-center'>
            <FaLock className='mr-2' /> Password
          </label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
            placeholder='Enter a new password'
          />
        </div>

        {/* Save Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center'
        >
          {isSubmitting ? (
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>
          ) : (
            <>
              <FaSave className='mr-2' /> Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
