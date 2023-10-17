'use client';

import { IconType } from 'react-icons';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

interface EditButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  darkMode?: boolean;
}

const ButtonStyle = styled.button<{ dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: baseline;
  gap: 4px;
  cursor: pointer;
  color: ${(props) => (props.dark ? COLORS.lightGray : COLORS.gray)};
  transition: color 0.2s transform 0.2s;
  &:hover {
    color: ${(props) => (props.dark ? '#ffffff' : COLORS.darkGray)};
  }
`;

const IconStyle = styled.div<{ dark: boolean }>`
  font-size: 1rem;
  padding: 3px 2px 4px 6px;
  outline: 1px solid;
  outline-color: ${(props) =>
    props.dark ? COLORS.darkGray : COLORS.lightGray};
  border-radius: 0.5rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.dark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'};
`;

const EditButton = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  darkMode = false,
}: EditButtonProps) => {
  return (
    <ButtonStyle dark={darkMode} disabled={disabled} onClick={onClick}>
      {label}
      {Icon && (
        <IconStyle dark={darkMode}>
          <Icon />
        </IconStyle>
      )}
    </ButtonStyle>
  );
};

export default EditButton;
