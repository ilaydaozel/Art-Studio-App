'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  width?: string;
}

const Button = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  width = '100%',
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: width,
      }}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:scale-105
        transition-transform
        md:py-2
        text-sm
        md:text-md
        border-2
        border-black
        font-semibold
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
            absolute
            left-4
            top-3
          '
        />
      )}
      {label}
    </button>
  );
};

export default Button;
