import { useState, useEffect } from 'react';

const TypingIndicator = () => {
  const [dots, setDots] = useState(''); // State to track the dots

  useEffect(() => {
    // Create an interval to update the dots every 300ms
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length >= 3) {
          return ''; // Reset dots after reaching 3
        }
        return prevDots + '.';
      });
    }, 300);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center space-x-2 text-gray-400 text-sm mt-2'>
      {/* Unique Typing Text */}
      <span className='typing-text'>Typing{dots}</span>

      {/* Animated Dots */}
      <div className='flex space-x-1'>
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-${index * 100}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;
