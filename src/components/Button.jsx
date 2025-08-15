import React from 'react';

const Button = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
