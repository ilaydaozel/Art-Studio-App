'use client';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';

interface MenuElementProps {
  address: string;
  displayName: string;
}
const Content = styled.text`
  text-align: center;
  padding: 2px 4px;
  color: ${COLORS.darkGray};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    font-weight: bold;
  }
`;

const DisplayName = styled.text`
  font-size: 12px;
`;

const MenuElement = ({ address, displayName }: MenuElementProps) => {
  return (
    <Content>
      <Link href={address}>
        <DisplayName>{displayName}</DisplayName>
      </Link>
    </Content>
  );
};

export default MenuElement;
