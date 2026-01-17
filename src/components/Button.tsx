import React from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingIcon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  label: string;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled,
  loadingIcon,
  variant = 'primary',
  label,
  ...props
}) => {
  const variation = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2
        px-4 py-2 rounded-lg font-medium text-white
        ${variation[variant]}
        ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}
      `}
      {...props}
    >
      {loading && (
        <span>
          {loadingIcon || <TbFidgetSpinner className="animate-spin" />}
        </span>
      )}
      {label}
    </button>
  );
};

export default Button;
