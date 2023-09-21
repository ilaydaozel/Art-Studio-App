'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

const gridAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const GridSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;

  div {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    animation: ${gridAnimation} 1.2s linear infinite;
  }

  div:nth-child(1) {
    top: 6px;
    left: 6px;
    animation-delay: 0s;
  }

  div:nth-child(2) {
    top: 6px;
    left: 24px;
    animation-delay: -0.4s;
  }

  div:nth-child(3) {
    top: 6px;
    left: 42px;
    animation-delay: -0.8s;
  }

  div:nth-child(4) {
    top: 24px;
    left: 6px;
    animation-delay: -0.4s;
  }

  div:nth-child(5) {
    top: 24px;
    left: 24px;
    animation-delay: -0.8s;
  }

  div:nth-child(6) {
    top: 24px;
    left: 42px;
    animation-delay: -1.2s;
  }

  div:nth-child(7) {
    top: 42px;
    left: 6px;
    animation-delay: -0.8s;
  }

  div:nth-child(8) {
    top: 42px;
    left: 24px;
    animation-delay: -1.2s;
  }

  div:nth-child(9) {
    top: 42px;
    left: 42px;
    animation-delay: -1.6s;
  }
`;

export default function Spinner() {
  return (
    <GridSpinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridSpinner>
  );
}
