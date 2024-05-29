import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset"; // Restringir a los valores válidos
  children: React.ReactNode; // children puede ser cualquier contenido de React
}

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button
      type={type}
      className="w-32 text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 mt-2"
    >
      {children}
    </button>
  );
};

export default Button;
