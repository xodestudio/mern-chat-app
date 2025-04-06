import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChatList = ({ filteredUsers, selectedUserHandler, selectedUsers, onlineUsers }) => {
  return (
    <div className='flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 modern-scrollbar max-h-[calc(100vh-200px)]'>
      {filteredUsers && filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <motion.div
            key={user._id}
            onClick={() => selectedUserHandler(user)}
            className={`p-3 md:p-4 flex items-center space-x-3 md:space-x-4 hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${
              selectedUsers?._id === user._id ? 'bg-gray-700' : ''
            }`}
            whileHover={{ scale: 1.02, backgroundColor: '#333' }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/chat/${user._id}`} key={user._id} className='flex items-center space-x-4'>
              <div className='relative'>
                <img
                  src={user.avatar}
                  alt='Avatar'
                  className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover object-top border-2 border-gray-700'
                />
                {onlineUsers?.includes(user._id.trim()) ? (
                  <div className='absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-gray-900'></div>
                ) : null}
              </div>

              <div>
                <h2 className='text-sm md:text-base font-semibold text-white'>{user.username}</h2>
                <p className='text-xs md:text-sm text-gray-400 truncate'>No messages yet</p>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <div className='p-4 text-center text-gray-500'>No users available.</div>
      )}
    </div>
  );
};

export default ChatList;
