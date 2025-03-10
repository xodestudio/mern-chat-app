import { FaComments, FaUserFriends, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DefaultHomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='flex flex-col items-center justify-start text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden h-screen'
    >
      {/* Custom SVG Illustration */}
      <motion.div
        className='w-24 sm:w-36 md:w-48 mb-3 sm:mb-5 animate-float'
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
          <g id='SVGRepo_iconCarrier'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 13.4811 3.09753 14.8788 3.7148 16.1181C3.96254 16.6155 4.05794 17.2103 3.90163 17.7945L3.30602 20.0205C3.19663 20.4293 3.57066 20.8034 3.97949 20.694L6.20553 20.0984C6.78973 19.9421 7.38451 20.0375 7.88191 20.2852C9.12121 20.9025 10.5189 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C10.2817 22.75 8.65552 22.3463 7.21315 21.6279C6.99791 21.5207 6.77814 21.4979 6.59324 21.5474L4.3672 22.143C2.84337 22.5507 1.44927 21.1566 1.857 19.6328L2.4526 17.4068C2.50208 17.2219 2.47933 17.0021 2.37213 16.7869C1.65371 15.3445 1.25 13.7183 1.25 12ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5ZM7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H13.5C13.9142 13.25 14.25 13.5858 14.25 14C14.25 14.4142 13.9142 14.75 13.5 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14Z'
              fill='#ffffff'
            ></path>
          </g>
        </svg>
      </motion.div>

      {/* Welcome Heading */}
      <motion.h1
        className='text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 sm:mb-3 animate-fade-in'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Welcome to <span className='text-yellow-400'>Messenger</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className='text-xs sm:text-sm md:text-base text-gray-400 mb-4 sm:mb-6 animate-fade-in max-w-xl text-center px-4 sm:px-0'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Connect with your friends and colleagues seamlessly. Start chatting, sharing, and
        collaborating today!
      </motion.p>

      {/* Features Section */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full max-w-5xl px-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Feature 1: Chat */}
        <motion.div
          className='p-3 sm:p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex justify-center'>
            <div className='p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full'>
              <FaComments className='text-base sm:text-lg md:text-xl text-white' />
            </div>
          </div>
          <h2 className='text-sm sm:text-base md:text-lg font-semibold text-white mt-2 sm:mt-3'>
            Real-Time Chat
          </h2>
          <p className='text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1'>
            Enjoy instant messaging with friends and colleagues.
          </p>
        </motion.div>

        {/* Feature 2: Connect */}
        <motion.div
          className='p-3 sm:p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex justify-center'>
            <div className='p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full'>
              <FaUserFriends className='text-base sm:text-lg md:text-xl text-white' />
            </div>
          </div>
          <h2 className='text-sm sm:text-base md:text-lg font-semibold text-white mt-2 sm:mt-3'>
            Connect Easily
          </h2>
          <p className='text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1'>
            Find and connect with your friends effortlessly.
          </p>
        </motion.div>

        {/* Feature 3: Fast */}
        <motion.div
          className='p-3 sm:p-4 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex justify-center'>
            <div className='p-2 sm:p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full'>
              <FaRocket className='text-base sm:text-lg md:text-xl text-white' />
            </div>
          </div>
          <h2 className='text-sm sm:text-base md:text-lg font-semibold text-white mt-2 sm:mt-3'>
            Lightning Fast
          </h2>
          <p className='text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1'>
            Experience blazing-fast messaging with no delays.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DefaultHomePage;
