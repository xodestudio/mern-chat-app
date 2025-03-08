import { FaChevronLeft } from 'react-icons/fa';
import { AiOutlineGlobal, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsChatSquareText } from 'react-icons/bs';

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
        {/* Select Language Section */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <AiOutlineGlobal className='text-blue-500' /> Select Language
          </h3>
          <select className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
            <option value='zh'>Chinese</option>
            <option value='ar'>Arabic</option>
          </select>
        </div>

        {/* Regional Settings Section */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <AiOutlineInfoCircle className='text-purple-500' /> Regional Settings
          </h3>
          <p className='text-gray-300 mb-4'>
            Adjust your regional preferences to customize your experience.
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='w-full'>
              <label className='block text-gray-400 mb-2'>Country</label>
              <select className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='us'>United States</option>
                <option value='es'>Spain</option>
                <option value='fr'>France</option>
                <option value='de'>Germany</option>
                <option value='cn'>China</option>
                <option value='sa'>Saudi Arabia</option>
              </select>
            </div>
            <div className='w-full'>
              <label className='block text-gray-400 mb-2'>Timezone</label>
              <select className='w-full bg-gray-700/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='utc-5'>UTC-5 (Eastern Time)</option>
                <option value='utc+1'>UTC+1 (Central European Time)</option>
                <option value='utc+8'>UTC+8 (China Standard Time)</option>
                <option value='utc+3'>UTC+3 (East Africa Time)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <BsChatSquareText className='text-teal-500' /> Share Your Feedback
          </h3>
          <p className='text-gray-300 mb-4'>
            Let us know how we can improve our language and regional settings.
          </p>
          <textarea
            placeholder='Type your feedback here...'
            className='w-full bg-gray-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 mb-4'
          ></textarea>
          <button className='w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition duration-300'>
            Submit Feedback
          </button>
        </div>

        {/* Help & Support Section */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <AiOutlineInfoCircle className='text-yellow-500' /> Need Help?
          </h3>
          <p className='text-gray-300 mb-4'>
            If you're having trouble with language settings, reach out to our support team.
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <button className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2'>
              <AiOutlineGlobal className='text-lg' /> Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
