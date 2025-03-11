import { motion } from 'framer-motion';
import { FaImage, FaSmile, FaMicrophone, FaTimes } from 'react-icons/fa'; // Added FaTimes for the cross icon
import { BsPaperclip } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';

const InputArea = ({
  message,
  handleChange,
  handleSubmit,
  handlePaperclipClick,
  fileInputRef,
  handleFileChange,
  selectedFile,
  setSelectedFile,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiClick
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className='p-4 md:p-6 border-t border-gray-700 flex items-center space-x-4 md:space-x-6 bg-gray-800'
    >
      {/* Attachment Icon */}
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
        <BsPaperclip
          className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white'
          onClick={handlePaperclipClick}
        />
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept='image/*,application/pdf,video/*'
        />
      </motion.div>

      {/* Emoji Icon */}
      <div className='relative'>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          <FaSmile
            className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white'
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
        </motion.div>
        {showEmojiPicker && (
          <div className='absolute bottom-10 left-0 z-10'>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      {/* Input Field with File Preview and Microphone Icon */}
      <div className='flex-1 relative'>
        {/* File Preview Dialog Box */}
        {selectedFile && (
          <div className='absolute bottom-16 left-0 bg-gray-700 rounded-lg p-2 shadow-lg'>
            <div className='relative'>
              {/* Cross Icon to Remove File */}
              <button
                type='button'
                onClick={() => setSelectedFile(null)}
                className='absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors'
              >
                <FaTimes className='text-white text-xs' />
              </button>

              {/* File Preview */}
              {selectedFile.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt='Preview'
                  className='w-24 h-24 rounded-lg object-cover'
                />
              ) : (
                <div className='flex items-center space-x-2'>
                  <span className='text-sm text-gray-400 truncate max-w-[150px]'>
                    {selectedFile.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input Field */}
        <div className='w-full bg-gray-700 text-sm md:text-base px-4 py-2 md:px-5 md:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-12'>
          <input
            value={message}
            onChange={handleChange}
            type='text'
            placeholder={selectedFile ? 'Add a caption...' : 'Type a message...'}
            className='w-full bg-transparent focus:outline-none'
          />
        </div>

        {/* Microphone Icon inside Input */}
        <motion.div>
          <FaMicrophone className='text-xl md:text-2xl cursor-pointer text-gray-400 hover:text-white absolute right-4 top-1/2 transform -translate-y-1/2' />
        </motion.div>
      </div>

      {/* Send Button */}
      <motion.button type='submit' whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
        <FiSend className='text-xl md:text-2xl cursor-pointer text-blue-500 hover:text-blue-400' />
      </motion.button>
    </form>
  );
};

export default InputArea;
