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

const Profile = ({ onClose }) => {
  const [darkMode, setDarkMode] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const { authUser } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
  };

  // Toggle Notifications
  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast.success('Notifications enabled!');
        // Example: Show a notification
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

  // Render the active component
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
            <div
              className='relative mb-8 w-full h-64 rounded-lg overflow-hidden bg-cover bg-center shadow-lg animate-fadeIn'
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
                className='absolute top-4 right-4 text-gray-300 hover:text-white transition-colors animate-fadeIn bg-gray-800/50 rounded-full p-2'
              >
                <FaTimes className='text-2xl' />
              </button>

              {/* Profile Image */}
              <div className='absolute -bottom-0 left-6 w-40 h-40 rounded-full overflow-hidden border-4 border-pink-300/80 shadow-lg bg-white'>
                <img
                  src={authUser?.data?.user?.avatar}
                  alt='Profile'
                  className='w-full h-full object-cover object-top'
                />
              </div>
            </div>

            {/* Name and Email */}
            <div className='mb-8 flex items-center justify-center w-full px-6'>
              <div className='w-full max-w-5xl p-10 bg-gray-900/60 rounded-2xl backdrop-blur-xl border-2 border-gray-700 shadow-2xl shadow-blue-500/30 relative overflow-hidden flex flex-col items-center'>
                {/* Profile Header */}
                <div className='w-full flex justify-between items-center px-6'>
                  <div className='text-left'>
                    <h2 className='text-5xl font-extrabold text-white neon-text'>
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
                      <a
                        key={index}
                        href='#'
                        className='neon-icon hover:text-blue-400 transition duration-300 transform hover:scale-125 hover:rotate-6'
                      >
                        <Icon />
                      </a>
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
                  <div className='text-center bg-gray-800/50 p-4 rounded-xl border border-gray-600 w-40'>
                    <p className='text-3xl font-bold text-white'>1.2K</p>
                    <p className='text-sm uppercase tracking-wider'>Followers</p>
                  </div>
                  <div className='text-center bg-gray-800/50 p-4 rounded-xl border border-gray-600 w-40'>
                    <p className='text-3xl font-bold text-white'>320</p>
                    <p className='text-sm uppercase tracking-wider'>Posts</p>
                  </div>
                  <div className='text-center bg-gray-800/50 p-4 rounded-xl border border-gray-600 w-40'>
                    <p className='text-3xl font-bold text-white'>85</p>
                    <p className='text-sm uppercase tracking-wider'>Projects</p>
                  </div>
                  <div className='text-center bg-gray-800/50 p-4 rounded-xl border border-gray-600 w-40'>
                    <p className='text-3xl font-bold text-white'>15</p>
                    <p className='text-sm uppercase tracking-wider'>Years Exp</p>
                  </div>
                </div>

                {/* Animated Border Effect */}
                <div className='absolute inset-0 w-full h-full bg-gradient-to-r from-[rgb(74,90,85)] via-[rgb(84,90,161)] to-[rgb(70,62,125)] opacity-30 blur-2xl'></div>
              </div>
            </div>

            {/* Grid Layout for Buttons */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fadeIn'>
              {/* Edit Profile */}
              <div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('editProfile')}
              >
                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
                  <FaUserEdit className='text-blue-400 text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Edit Profile</span>
                  <p className='text-sm text-gray-300'>Update your personal information</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </div>

              {/* Privacy Settings */}
              <div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('privacySettings')}
              >
                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
                  <FaLock className='text-blue-400 text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Privacy Settings</span>
                  <p className='text-sm text-gray-300'>Manage your privacy preferences</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </div>

              {/* Dark Mode Toggle */}
              <div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={toggleDarkMode}
              >
                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
                  {darkMode ? (
                    <FaMoon className='text-blue-400 text-2xl' />
                  ) : (
                    <FaSun className='text-blue-400 text-2xl' />
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
                      darkMode ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Notifications Toggle */}
              <div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={toggleNotifications}
              >
                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
                  <FaBell className='text-blue-400 text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Notifications</span>
                  <p className='text-sm text-gray-300'>Manage your notification preferences</p>
                </div>
                <div className='ml-auto'>
                  <div
                    className={`w-12 h-6 flex items-center rounded-full p-1 ${
                      notificationsEnabled ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                        notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('paymentMethods')}
              >
                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
                  <FaCreditCard className='text-blue-400 text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Payment Methods</span>
                  <p className='text-sm text-gray-300'>Manage your payment options</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </div>

              {/* Language Settings */}
              <div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('languageSettings')}
              >
                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
                  <FaLanguage className='text-blue-400 text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Language Settings</span>
                  <p className='text-sm text-gray-300'>Change your preferred language</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </div>

              {/* Help & Support */}
              <div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={() => setActiveComponent('helpSupport')}
              >
                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
                  <FaInfoCircle className='text-blue-400 text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Help & Support</span>
                  <p className='text-sm text-gray-300'>Get assistance and support</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </div>

              {/* Logout */}
              <div
                className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                onClick={handleLogout}
              >
                <div className='p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition duration-300'>
                  <FaSignOutAlt className='text-blue-400 text-2xl' />
                </div>
                <div className='ml-4'>
                  <span className='text-lg font-semibold text-white'>Logout</span>
                  <p className='text-sm text-gray-300'>Sign out of your account</p>
                </div>
                <FaChevronRight className='ml-auto text-gray-400 text-xl' />
              </div>
            </div>
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
