'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const TextDiv = styled.div`
  width: 100%;
  margin: 4px 8px;
  padding: 6px 8px;
  color: ${COLORS.darkGray};
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 1em;
  &:hover {
    font-weight: 700;
  }
`;
const UserMenuElement = ({ onClick, label }: MenuItemProps) => {
  return <TextDiv onClick={onClick}>{label}</TextDiv>;
};

export default UserMenuElement;
