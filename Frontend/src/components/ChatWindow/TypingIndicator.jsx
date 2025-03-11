import { motion } from 'framer-motion';

const TypingIndicator = ({ isTyping }) => {
  return (
    isTyping && (
      <motion.div
        className='flex items-center space-x-2 text-gray-400 text-sm mt-2 px-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className='typing-text'>Typing</span>
        <div className='flex space-x-1'>
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              className='w-1.5 h-1.5 bg-gray-400 rounded-full'
              animate={{
                y: [0, -5, 0],
                transition: { repeat: Infinity, duration: 0.5, delay: index * 0.1 }
              }}
            ></motion.div>
          ))}
        </div>
      </motion.div>
    )
  );
};

export default TypingIndicator;
