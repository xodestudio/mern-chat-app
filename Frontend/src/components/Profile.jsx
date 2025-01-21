import React from 'react';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { BsFillCircleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { authUser } = useSelector(store => store.user);

  return (
    <div className='h-screen flex bg-gray-900 text-white font-sans'>
      {/* Sidebar */}
      <aside className='w-1/4 bg-gray-800 border-r border-gray-700 hidden lg:block'>
        <div className='p-4 flex justify-between items-center border-b border-gray-700'>
          <h1 className='text-2xl font-semibold'>Profile</h1>
          <AiOutlineSetting className='text-xl cursor-pointer' />
        </div>

        {/* Profile Info */}
        <div className='p-4 flex flex-col items-center'>
          <img
            src={authUser?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
            alt='Profile Avatar'
            className='w-24 h-24 rounded-full border-4 border-blue-500'
          />
          <h2 className='text-xl font-semibold mt-3'>{authUser?.username || 'Username'}</h2>
          <p className='text-sm text-gray-400'>@{authUser?.username || 'username'}</p>
          <div className='mt-3'>
            <p className='text-sm text-gray-400'>{authUser?.bio || 'Your bio will appear here'}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className='mt-4'>
          <ul>
            <li className='p-4 hover:bg-gray-700 cursor-pointer'>
              <div className='flex items-center space-x-2'>
                <AiOutlineUser className='text-xl' />
                <span>Profile</span>
              </div>
            </li>
            <li className='p-4 hover:bg-gray-700 cursor-pointer'>
              <div className='flex items-center space-x-2'>
                <BsFillCircleFill className='text-xl' />
                <span>Friends</span>
              </div>
            </li>
            <li className='p-4 hover:bg-gray-700 cursor-pointer'>
              <div className='flex items-center space-x-2'>
                <AiOutlineSetting className='text-xl' />
                <span>Settings</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Profile Details */}
      <section className='flex-1 flex flex-col'>
        <div className='p-4 flex items-center justify-between border-b border-gray-700'>
          <div className='flex items-center space-x-3'>
            <img
              src={authUser?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
              alt='Profile Avatar'
              className='w-12 h-12 rounded-full'
            />
            <div>
              <h2 className='text-base font-semibold'>{authUser?.username || 'Username'}</h2>
              <p className='text-sm text-gray-400'>Active 1h ago</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className='p-4 space-y-3'>
          <h3 className='text-lg font-semibold'>About</h3>
          <p className='text-sm text-gray-400'>{authUser?.bio || 'No bio available'}</p>
        </div>

        {/* Photos Section */}
        <div className='p-4'>
          <h3 className='text-lg font-semibold'>Photos</h3>
          <div className='grid grid-cols-3 gap-3'>
            <img
              src='https://randomuser.me/api/portraits/women/1.jpg'
              alt='Photo 1'
              className='w-full h-32 object-cover rounded-lg'
            />
            <img
              src='https://randomuser.me/api/portraits/men/2.jpg'
              alt='Photo 2'
              className='w-full h-32 object-cover rounded-lg'
            />
            <img
              src='https://randomuser.me/api/portraits/women/3.jpg'
              alt='Photo 3'
              className='w-full h-32 object-cover rounded-lg'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
