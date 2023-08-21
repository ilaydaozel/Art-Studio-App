'use client';

import { IconType } from 'react-icons';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

interface TextButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  width?: string;
}

const ButtonStyle = styled.button<{ width: string }>`
  display: flex;
  align-items: center;
  justify-content: baseline;
  gap: 4px;
  cursor: pointer;
  color: ${COLORS.gray};
  transition: color 0.2s transform 0.2s;
  &:hover {
    color: ${COLORS.darkGray};
  }
`;

const TextButton = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  width = 'auto',
}: TextButtonProps) => {
  return (
    <ButtonStyle disabled={disabled} width={width} onClick={onClick}>
      {label}
      {Icon && <Icon size={18} />}
    </ButtonStyle>
  );
};

export default TextButton;
