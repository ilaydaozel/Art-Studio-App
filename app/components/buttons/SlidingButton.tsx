'use client';

import { IconType } from 'react-icons';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

interface SlidingButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  width?: string;
}

const ButtonStyle = styled.button<{ width: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: ${(props) => props.width};
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: ${COLORS.darkGray};
  color: white;
  transition: transform 0.3s;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-0.5rem);
  }
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
    padding: 0.2rem 0.4rem;
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
