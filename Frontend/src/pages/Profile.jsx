import React, { useState } from 'react';
import {
  FaUserEdit,
  FaBell,
  FaSignOutAlt,
  FaChevronRight,
  FaTimes,
  FaLock,
  FaMoon,
  FaSun,
  FaCreditCard,
  FaLanguage,
  FaInfoCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaTiktok
} from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import EditProfile from './EditProfile';
import PrivacySettings from './PrivacySettings';
import PaymentMethods from './PaymentMethods';
import LanguageSettings from './LanguageSettings';
import HelpSupport from './HelpSupport';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/features/userSlice';
import { motion } from 'framer-motion';

const Profile = ({ onClose }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const { authUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Toggle Notifications
  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast.success('Notifications enabled!');
        new Notification('Notifications Enabled', {
          body: 'You will now receive real-time notifications.'
        });
      } else {
        toast.error('Notifications permission denied.');
      }
    } else {
      setNotificationsEnabled(false);
      toast.info('Notifications disabled.');
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const token = Cookies.get('accessToken');
      if (!token) {
        toast.error('User not logged in!');
        return;
      }
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      if (response.status === 200) {
        dispatch(logoutUser());
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        toast.success('Logged out successfully!');
        navigate('/login');
      } else {
        throw new Error('Logout failed, please try again.');
      }
    } catch (error) {
      console.error('Logout Error:', error);
      toast.error('Something went wrong!');
    }
  };

  // Render Active Component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'editProfile':
        return <EditProfile onClose={() => setActiveComponent(null)} />;
      case 'privacySettings':
        return <PrivacySettings onClose={() => setActiveComponent(null)} />;
      case 'paymentMethods':
        return <PaymentMethods onClose={() => setActiveComponent(null)} />;
      case 'languageSettings':
        return <LanguageSettings onClose={() => setActiveComponent(null)} />;
      case 'helpSupport':
        return <HelpSupport onClose={() => setActiveComponent(null)} />;
      default:
        return (
          <>
            {/* Profile Header with Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='relative mb-8 w-full h-64 rounded-3xl overflow-hidden bg-cover bg-center shadow-2xl'
              style={{
                backgroundImage: `url(${
                  authUser?.data?.user?.coverPhoto ||
                  'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                })`
              }}
            >
              {/* Close Icon */}
              <button
                onClick={onClose}
                className='absolute top-4 right-4 text-gray-300 hover:text-white transition-colors bg-gray-800/50 rounded-full p-2 shadow-lg'
              >
                <FaTimes className='text-xl' />
              </button>
              {/* Profile Image */}
              <div className='absolute bottom-2 left-6 w-40 h-40 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg bg-white'>
                <img
                  src={authUser?.data?.user?.avatar}
                  alt='Profile'
                  className='w-full h-full object-cover object-top'
                />
              </div>
            </motion.div>

            {/* Name and Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='mb-8 flex items-center justify-center w-full px-6'
            >
              <div className='w-full max-w-5xl p-10 bg-gray-900/60 rounded-3xl backdrop-blur-xl border-2 border-gray-700 shadow-2xl shadow-blue-500/30 relative overflow-hidden flex flex-col items-center'>
                {/* Profile Header */}
                <div className='w-full flex justify-between items-center px-6'>
                  <div className='text-left'>
                    <h2 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500'>
                      {authUser?.data?.user?.fullName}
                    </h2>
                    <p className='text-xl text-gray-300 font-medium'>
                      @{authUser?.data?.user?.username}
                    </p>
                  </div>
                  {/* Social Media Icons */}
                  <div className='flex space-x-4 text-4xl text-white'>
                    {[
                      FaFacebook,
                      FaTwitter,
                      FaInstagram,
                      FaLinkedin,
                      FaGithub,
                      FaYoutube,
                      FaTiktok
                    ].map((Icon, index) => (
                      <motion.a
                        key={index}
                        href='#'
                        whileHover={{ rotate: 10 }}
                        className='hover:text-blue-400 transition duration-300 transform'
                      >
                        <Icon />
                      </motion.a>
                    ))}
                  </div>
                </div>
                {/* Description */}
                <p className='text-sm text-gray-400 italic max-w-lg mt-4 text-center'>
                  🚀 Passionate Developer | Tech Enthusiast | Innovator | Content Creator 🎥 | AI
                  Explorer | Open Source Contributor
                </p>
                {/* Stats Section */}
                <div className='flex justify-center space-x-10 mt-6 text-gray-300 w-full'>
                  <motion.div className='text-center bg-gray-800/50 p-4 rounded-xl border border-gray-600 w-40'>
                    <p className='text-3xl font-bold text-white'>1.2K</p>
                    <p className='text-sm uppercase tracking-wider'>Followers</p>
                  </motion.div>
                  <motion.div className='text-center bg-gray-800/50 p-4 rounded-xl border border-gray-600 w-40'>
                    <p className='text-3xl font-bold text-white'>320</p>
                    <p className='text-sm uppercase tracking-wider'>Posts</p>
                  </motion.div>
                  <motion.div className='text-center bg-gray-800/50 p-4 rounded-xl border border-gray-600 w-40'>
                    <p className='text-3xl font-bold text-white'>85</p>
                    <p className='text-sm uppercase tracking-wider'>Projects</p>
                  </motion.div>
                  <motion.div className='text-center bg-gray-800/50 p-4 rounded-xl border border-gray-600 w-40'>
                    <p className='text-3xl font-bold text-white'>15</p>
                    <p className='text-sm uppercase tracking-wider'>Years Exp</p>
                  </motion.div>
                </div>
                {/* Animated Border Effect */}
                <div className='absolute inset-0 w-full h-full bg-gradient-to-r from-[rgb(74,90,85)] via-[rgb(84,90,161)] to-[rgb(70,62,125)] opacity-30 blur-2xl'></div>
              </div>
            </motion.div>

            {/* Grid Layout for Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fadeIn'
            >
              {/* Edit Profile */}
              <motion.div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('editProfile')}
              >
                <div className='p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg group-hover:from-blue-600 group-hover:to-cyan-600 transition duration-300'>
                  <FaUserEdit className='text-white text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Edit Profile</span>
                  <p className='text-sm text-gray-300'>Update your personal information</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </motion.div>

              {/* Privacy Settings */}
              <motion.div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('privacySettings')}
              >
                <div className='p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg group-hover:from-purple-600 group-hover:to-indigo-600 transition duration-300'>
                  <FaLock className='text-white text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Privacy Settings</span>
                  <p className='text-sm text-gray-300'>Manage your privacy preferences</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </motion.div>

              {/* Dark Mode Toggle */}
              <motion.div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={toggleDarkMode}
              >
                <div className='p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg group-hover:from-yellow-600 group-hover:to-orange-600 transition duration-300'>
                  {darkMode ? (
                    <FaMoon className='text-white text-2xl' />
                  ) : (
                    <FaSun className='text-white text-2xl' />
                  )}
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <p className='text-sm text-gray-300'>Switch between dark and light themes</p>
                </div>
                <div className='ml-auto'>
                  <div
                    className={`w-12 h-6 flex items-center rounded-full p-1 ${
                      darkMode ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-500'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </div>
              </motion.div>

              {/* Notifications Toggle */}
              <motion.div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={toggleNotifications}
              >
                <div className='p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg group-hover:from-green-600 group-hover:to-teal-600 transition duration-300'>
                  <FaBell className='text-white text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Notifications</span>
                  <p className='text-sm text-gray-300'>Manage your notification preferences</p>
                </div>
                <div className='ml-auto'>
                  <div
                    className={`w-12 h-6 flex items-center rounded-full p-1 ${
                      notificationsEnabled
                        ? 'bg-gradient-to-r from-green-500 to-teal-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                        notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('paymentMethods')}
              >
                <div className='p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg group-hover:from-red-600 group-hover:to-pink-600 transition duration-300'>
                  <FaCreditCard className='text-white text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Payment Methods</span>
                  <p className='text-sm text-gray-300'>Manage your payment options</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </motion.div>

              {/* Language Settings */}
              <motion.div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('languageSettings')}
              >
                <div className='p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg group-hover:from-teal-600 group-hover:to-cyan-600 transition duration-300'>
                  <FaLanguage className='text-white text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Language Settings</span>
                  <p className='text-sm text-gray-300'>Change your preferred language</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </motion.div>

              {/* Help & Support */}
              <motion.div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('helpSupport')}
              >
                <div className='p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg group-hover:from-yellow-600 group-hover:to-orange-600 transition duration-300'>
                  <FaInfoCircle className='text-white text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Help & Support</span>
                  <p className='text-sm text-gray-300'>Get assistance and support</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </motion.div>

              {/* Logout */}
              <motion.div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-red-700/70 transition duration-300 group'
                onClick={handleLogout}
              >
                <div className='p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg group-hover:from-red-600 group-hover:to-pink-600 transition duration-300'>
                  <FaSignOutAlt className='text-white text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Logout</span>
                  <p className='text-sm text-gray-300'>Sign out of your account</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </motion.div>
            </motion.div>
          </>
        );
    }
  };

  return (
    <div className='h-full w-full bg-gray-900/90 backdrop-blur-lg p-6 overflow-y-auto animate-slideIn'>
      {renderActiveComponent()}
      <ToastContainer />
    </div>
  );
};

export default Profile;
