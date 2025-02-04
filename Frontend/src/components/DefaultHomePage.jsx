import React from 'react';
import { FaComments, FaUserFriends, FaRocket } from 'react-icons/fa'; // Import icons from react-icons

const DefaultHomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800'>
      {/* Custom SVG Illustration */}
      <div className='w-64 md:w-80 mb-8 animate-float'>
        <svg
          viewBox='0 0 500 500'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-full h-full'
        >
          <circle cx='250' cy='250' r='250' fill='#1E293B' />
          <path d='M150 300H350V350H150V300Z' fill='#374151' />
          <path d='M200 250H300V300H200V250Z' fill='#4B5563' />
          <path d='M250 200H300V250H250V200Z' fill='#6B7280' />
          <path d='M150 200H200V250H150V200Z' fill='#6B7280' />
          <circle cx='250' cy='150' r='50' fill='#3B82F6' />
          <circle cx='250' cy='150' r='30' fill='#1E40AF' />
          <path
            d='M250 100C250 44.7715 294.772 0 350 0C405.228 0 450 44.7715 450 100C450 155.228 405.228 200 350 200C294.772 200 250 155.228 250 100Z'
            fill='#3B82F6'
          />
          <path
            d='M250 100C250 44.7715 205.228 0 150 0C94.7715 0 50 44.7715 50 100C50 155.228 94.7715 200 150 200C205.228 200 250 155.228 250 100Z'
            fill='#3B82F6'
          />
        </svg>
      </div>

      {/* Welcome Heading */}
      <h1 className='text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in'>
        Welcome to <span className='text-blue-500'>Messenger</span>
      </h1>

      {/* Subheading */}
      <p className='text-lg md:text-xl text-gray-400 mb-8 animate-fade-in delay-100 max-w-2xl'>
        Connect with your friends and colleagues seamlessly. Start chatting, sharing, and
        collaborating today!
      </p>

      {/* Features Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in delay-200'>
        {/* Feature 1: Chat */}
        <div className='p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <div className='flex justify-center'>
            <div className='p-4 bg-blue-900 rounded-full'>
              <FaComments className='text-3xl text-blue-500' />
            </div>
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>Real-Time Chat</h2>
          <p className='text-gray-400 mt-2'>Enjoy instant messaging with friends and colleagues.</p>
        </div>

        {/* Feature 2: Connect */}
        <div className='p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <div className='flex justify-center'>
            <div className='p-4 bg-purple-900 rounded-full'>
              <FaUserFriends className='text-3xl text-purple-500' />
            </div>
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>Connect Easily</h2>
          <p className='text-gray-400 mt-2'>Find and connect with your friends effortlessly.</p>
        </div>

        {/* Feature 3: Fast */}
        <div className='p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
          <div className='flex justify-center'>
            <div className='p-4 bg-green-900 rounded-full'>
              <FaRocket className='text-3xl text-green-500' />
            </div>
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>Lightning Fast</h2>
          <p className='text-gray-400 mt-2'>Experience blazing-fast messaging with no delays.</p>
        </div>
      </div>
    </div>
  );
};

export default DefaultHomePage;
