import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  const handleClick = () => {
    onClick(label);
  };

  const baseClasses =
    'flex items-center justify-center h-20 text-3xl font-semibold rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-amber-500 transition-all duration-150 ease-in-out transform active:scale-95';

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;