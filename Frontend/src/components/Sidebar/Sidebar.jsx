import { motion } from 'framer-motion';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import SearchBar from './SearchBar';
import ChatList from './ChatList';

const Sidebar = ({
  isSidebarVisible,
  setShowProfile,
  searchQuery,
  setSearchQuery,
  filteredUsers,
  selectedUserHandler,
  selectedUsers,
  onlineUsers
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out z-20 ${
        isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:relative`}
    >
      <div className='p-4 md:p-6 flex justify-between items-center border-b border-gray-700'>
        <h1 className='text-xl md:text-2xl font-bold text-white'>Messenger</h1>
        <HiOutlinePencilAlt
          className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white'
          onClick={() => setShowProfile(true)}
        />
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ChatList
        filteredUsers={filteredUsers}
        selectedUserHandler={selectedUserHandler}
        selectedUsers={selectedUsers}
        onlineUsers={onlineUsers}
      />
    </aside>
  );
};

export default Sidebar;
