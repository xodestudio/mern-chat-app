import { motion } from 'framer-motion';
import { AiOutlineVideoCamera, AiOutlinePhone, AiOutlineInfoCircle } from 'react-icons/ai';

const ChatHeader = ({ selectedUsers, onlineUsers }) => {
  return (
    <motion.div
      className='p-4 md:p-6 flex items-center justify-between border-b border-gray-700 bg-gray-800'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex items-center space-x-3 md:space-x-4'>
        <img
          src={selectedUsers?.avatar}
          alt='Avatar'
          className='w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-700'
        />
        <div>
          <h2 className='text-sm md:text-base font-semibold text-white'>
            {selectedUsers?.username}
          </h2>
          <p className='text-xs md:text-sm text-gray-400'>
            {onlineUsers?.includes(selectedUsers._id.trim()) ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      <div className='flex items-center space-x-4 md:space-x-6'>
        <AiOutlineVideoCamera className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
        <AiOutlinePhone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
        <AiOutlineInfoCircle className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white' />
      </div>
    </motion.div>
  );
};

export default ChatHeader;
