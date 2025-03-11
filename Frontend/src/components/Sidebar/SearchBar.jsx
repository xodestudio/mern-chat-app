import { motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='p-4 md:p-6 border-b border-gray-700'>
      <motion.div
        className='flex items-center space-x-3 bg-gray-700 rounded-full px-4 py-2'
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <AiOutlineSearch className='text-xl text-gray-400' />
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='flex-1 bg-transparent text-sm md:text-base text-white focus:outline-none'
        />
      </motion.div>
    </div>
  );
};

export default SearchBar;
