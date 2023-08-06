'use client';

import { IconType } from 'react-icons';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

interface SlidingButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  width?: string;
}

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  transition: transform 0.5s;
  background-color: ${COLORS.darkGray};
  color: white;
  &:hover {
    transform: translateY(0.5rem);
  }
`;

const SlidingButton = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  width = '100%',
}: SlidingButtonProps) => {
  return (
    <ButtonStyle disabled={disabled} onClick={onClick}>
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
    </ButtonStyle>
  );
};

export default SlidingButton;
