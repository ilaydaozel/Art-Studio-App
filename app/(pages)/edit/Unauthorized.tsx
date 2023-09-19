'use client';

import { COLORS } from '@/constants/colors';
import React from 'react';
import styled from 'styled-components';
import { BsEyeSlash } from 'react-icons/bs';

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100vh;
  h2 {
    font-size: 1rem;
    color: ${COLORS.darkGray};
  }
  @media (max-width: 768px){
    h2 {
        font-size: 0.8rem;
      }
  }
  @media (max-width: 576px){
    h2 {
        font-size: 0.6rem;
      }
  }
  }
`;
const Caption = styled.div`
  color: ${COLORS.red};
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;
const Unauthorized = () => {
  return (
    <UnauthorizedContainer>
      <Caption>
        Unauthorized Page <BsEyeSlash></BsEyeSlash>
      </Caption>
      <h2>Access is only allowed for registered users.</h2>
    </UnauthorizedContainer>
  );
};

export default Unauthorized;
