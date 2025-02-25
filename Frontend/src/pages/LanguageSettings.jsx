import { FaChevronLeft } from 'react-icons/fa';

const LanguageSettings = ({ onClose }) => {
  return (
    <div className='h-full w-full bg-gray-900/95 backdrop-blur-lg p-6 overflow-y-auto animate-slideInFromRight'>
      {/* Back Button */}
      <button
        onClick={onClose}
        className='absolute top-6 left-6 text-gray-300 hover:text-white transition-colors bg-gray-800/50 rounded-full p-3'
      >
        <FaChevronLeft className='text-xl' />
      </button>

      {/* Header */}
      <h2 className='text-4xl font-bold text-white mb-8 text-center'>Language Settings</h2>

      {/* Language Options */}
      <div className='space-y-6'>
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4'>Select Language</h3>
          <select className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
