'use client';
import { COLORS } from '@/constants/colors';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 68px;
  height: 68px;

  div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 12px;
    background: ${COLORS.lightGray};
    animation: ${spinAnimation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    left: 4px;
    animation-delay: -0.24s;
  }

  div:nth-child(2) {
    left: 24px;
    animation-delay: -0.12s;
  }

  div:nth-child(3) {
    left: 48px;
    animation-delay: 0;
  }
`;

export default function Spinner() {
  return (
    <SpinnerContainer>
      <div></div>
      <div></div>
      <div></div>
    </SpinnerContainer>
  );
}
