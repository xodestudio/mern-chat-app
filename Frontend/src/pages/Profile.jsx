import { useState } from 'react';
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
              className='relative w-full h-72 rounded-t-3xl overflow-hidden bg-cover bg-center shadow-2xl'
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
                className='absolute top-6 right-6 text-gray-300 hover:text-white transition-colors bg-gray-800/50 rounded-full p-3 shadow-lg'
              >
                <FaTimes className='text-xl' />
              </button>
              {/* Profile Image */}
              <div className='absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg bg-white'>
                <img
                  src={authUser?.data?.user?.avatar}
                  alt='Profile'
                  className='w-full h-full object-cover object-top'
                />
              </div>
            </motion.div>

            {/* Profile Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='w-full px-4 sm:px-6 py-10 bg-gray-900/70 rounded-b-3xl backdrop-blur-xl border-t border-gray-700 shadow-2xl relative overflow-hidden'
            >
              {/* User Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className='text-center mb-8'
              >
                <h2 className='text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500'>
                  {authUser?.data?.user?.fullName}
                </h2>
                <p className='text-lg sm:text-xl text-gray-300 font-medium mt-2'>
                  @{authUser?.data?.user?.username}
                </p>
                <p className='text-sm sm:text-base text-gray-400 italic mt-2'>
                  🚀 Passionate Developer | Tech Enthusiast | Innovator | Content Creator 🎥 | AI
                  Explorer | Open Source Contributor
                </p>
              </motion.div>

              {/* Social Media Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className='flex flex-wrap justify-center gap-6 sm:gap-8 text-white mb-8'
              >
                {[
                  { Icon: FaFacebook, color: '#1877F2' },
                  { Icon: FaTwitter, color: '#1DA1F2' },
                  {
                    Icon: FaInstagram,
                    color: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'
                  },
                  { Icon: FaLinkedin, color: '#0A66C2' },
                  { Icon: FaGithub, color: '#171515' },
                  { Icon: FaYoutube, color: '#FF0000' },
                  { Icon: FaTiktok, color: 'linear-gradient(45deg, #000, #666)' }
                ].map(({ Icon, color }, index) => (
                  <motion.a
                    key={index}
                    href='#'
                    whileHover={{
                      boxShadow: color.includes('gradient')
                        ? `0 0 15px ${color}`
                        : `0 0 15px ${color}`,
                      borderColor: color
                    }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-transparent border-2 border-white rounded-full shadow-lg overflow-hidden group`}
                    style={{
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {/* Icon */}
                    <Icon
                      className={`text-2xl sm:text-3xl text-white transition duration-300`}
                      style={{
                        background: color.includes('gradient') ? color : undefined,
                        WebkitBackgroundClip: color.includes('gradient') ? 'text' : undefined,
                        backgroundClip: color.includes('gradient') ? 'text' : undefined
                      }}
                    />

                    {/* Platform-Specific Glow Effect */}
                    <motion.div
                      className='absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md'
                      style={{
                        background: color.includes('gradient') ? color : undefined
                      }}
                    ></motion.div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Grid Layout for Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className='grid grid-cols-1 sm:grid-cols-2 gap-6'
              >
                {/* Edit Profile */}
                <motion.div
                  className='flex items-center p-5 bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-lg cursor-pointer hover:bg-gray-700/70 transition duration-300 group'
                  onClick={() => setActiveComponent('editProfile')}
                >
                  <div className='p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg group-hover:from-blue-600 group-hover:to-cyan-600 transition duration-300'>
                    <FaUserEdit className='text-white text-2xl' />
                  </div>
                  <div className='ml-4 flex-grow'>
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
                  <div className='ml-4 flex-grow'>
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
                  <div className='ml-4 flex-grow'>
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
                  <div className='ml-4 flex-grow'>
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
                  <div className='ml-4 flex-grow'>
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
                  <div className='ml-4 flex-grow'>
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
                  <div className='ml-4 flex-grow'>
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
                  <div className='ml-4 flex-grow'>
                    <span className='text-lg font-semibold text-white'>Logout</span>
                    <p className='text-sm text-gray-300'>Sign out of your account</p>
                  </div>
                  <FaChevronRight className='ml-auto text-gray-400 text-xl' />
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        );
    }
  };

  return (
    <div className='h-full w-full bg-gray-900/90 backdrop-blur-lg overflow-y-auto'>
      {renderActiveComponent()}
      <ToastContainer />
    </div>
  );
};

export default Profile;
