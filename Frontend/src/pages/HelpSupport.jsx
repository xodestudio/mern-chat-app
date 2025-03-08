import {
  FaChevronLeft,
  FaQuestionCircle,
  FaCommentDots,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsChatSquareText, BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';

const HelpSupport = ({ onClose }) => {
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
      <h2 className='text-4xl font-bold text-white mb-8 text-center'>Help & Support</h2>

      {/* Help Options */}
      <div className='space-y-6'>
        {/* Contact Support Section */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <FaEnvelope className='text-blue-500' /> Contact Support
          </h3>
          <p className='text-gray-300 mb-4'>
            Need help? Reach out to our support team via email or phone.
          </p>
          <div className='flex flex-col md:flex-row gap-4'>
            <button className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2'>
              <AiOutlineMail className='text-lg' /> Email Us
            </button>
            <button className='w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2'>
              <AiOutlinePhone className='text-lg' /> Call Us
            </button>
          </div>
        </div>

        {/* FAQs Section */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <FaQuestionCircle className='text-yellow-500' /> Frequently Asked Questions
          </h3>
          <div className='space-y-4'>
            <div className='bg-gray-700/50 p-4 rounded-lg'>
              <h4 className='text-lg font-medium text-white mb-2'>How do I reset my password?</h4>
              <p className='text-gray-300'>
                Go to the login page and click on "Forgot Password." Follow the instructions sent to
                your email.
              </p>
            </div>
            <div className='bg-gray-700/50 p-4 rounded-lg'>
              <h4 className='text-lg font-medium text-white mb-2'>
                How can I contact customer support?
              </h4>
              <p className='text-gray-300'>
                You can reach us via email at support@example.com or call us at +123 456 7890.
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <AiOutlineInfoCircle className='text-purple-500' /> Troubleshooting
          </h3>
          <p className='text-gray-300 mb-4'>
            If you're experiencing issues, try the following steps:
          </p>
          <ul className='list-disc pl-6 text-gray-300 space-y-2'>
            <li>Clear your browser cache and cookies.</li>
            <li>Ensure your internet connection is stable.</li>
            <li>Restart the app or refresh the page.</li>
          </ul>
        </div>

        {/* Feedback Section */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <BsChatSquareText className='text-teal-500' /> Share Your Feedback
          </h3>
          <p className='text-gray-300 mb-4'>
            We value your feedback! Let us know how we can improve.
          </p>
          <textarea
            placeholder='Type your feedback here...'
            className='w-full bg-gray-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 mb-4'
          ></textarea>
          <button className='w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition duration-300'>
            Submit Feedback
          </button>
        </div>

        {/* Social Media Links */}
        <div className='bg-gray-800/70 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
            <FaCommentDots className='text-pink-500' /> Connect With Us
          </h3>
          <div className='flex justify-center gap-6 text-2xl text-gray-300'>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <BsTwitter className='hover:text-blue-400 transition-colors' />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <BsInstagram className='hover:text-pink-500 transition-colors' />
            </a>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <BsFacebook className='hover:text-blue-600 transition-colors' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
