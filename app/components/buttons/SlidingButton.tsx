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

const ButtonStyle = styled.button<{ width: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  width: ${(props) => props.width};
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
  icon: Icon,
  width = 'auto',
}: SlidingButtonProps) => {
  return (
    <ButtonStyle disabled={disabled} width={width} onClick={onClick}>
      {label}
      {Icon && (
        <Icon
          size={18}
          className='
            text-neutral-100
          '
        />
      )}
    </ButtonStyle>
  );
};

export default SlidingButton;
