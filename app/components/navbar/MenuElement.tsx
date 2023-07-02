'use client';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface MenuElementProps {
  address: string;
  displayName: string;
}
const Content = styled.text`
  text-align: center;
  color: #bf4f74;
  padding: 2px 4px;
  color: gray;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f7fafc;
  }
`;

const DisplayName = styled.a`
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
