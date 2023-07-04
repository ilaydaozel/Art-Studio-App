'use client';
import { COLORS } from '@/constants/colors';
import React from 'react';
import styled from 'styled-components';

interface LogoTitleProps {
  children: React.ReactNode;
}
const Title = styled.text`
  font-weight: 600;
  color: ${COLORS.darkGray};
  font-size: 14px;
`;
const LogoTitle = ({ children }: LogoTitleProps) => {
  return <Title>{children}</Title>;
};

export default LogoTitle;
