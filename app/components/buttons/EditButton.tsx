'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { FaRegEdit } from 'react-icons/fa';

interface EditButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
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
  outline-color: ${(props) => (props.dark ? COLORS.gray : COLORS.lightGray)};
  border-radius: 0.5rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.dark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.1)'};
`;

const EditButton = ({
  label,
  onClick,
  disabled,
  darkMode = false,
}: EditButtonProps) => {
  return (
    <ButtonStyle dark={darkMode} disabled={disabled} onClick={onClick}>
      {label}
      <IconStyle dark={darkMode}>
        <FaRegEdit />
      </IconStyle>
    </ButtonStyle>
  );
};

export default EditButton;
