import { useNavigate } from 'react-router-dom';

const SessionExpiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
        <h2 className='text-xl font-bold mb-4'>Session Expired</h2>
        <p className='mb-4'>Your session has expired. Please log in again.</p>
        <button
          onClick={() => {
            onClose();
            navigate('/login');
          }}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
