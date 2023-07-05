'use client';

import { IconType } from 'react-icons';
import { COLORS } from '@/constants/colors';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  width?: string;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  width = '100%',
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: width,
        backgroundColor: outline ? 'white' : COLORS.yellow,
        border: outline ? '2px solid' : '2px solid',
        borderColor: outline ? 'black' : COLORS.yellow,
        color: outline ? 'black' : 'black',
      }}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
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
