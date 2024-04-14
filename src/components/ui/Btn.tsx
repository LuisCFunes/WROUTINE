import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode; // children puede ser cualquier contenido de React
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="w-24 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
