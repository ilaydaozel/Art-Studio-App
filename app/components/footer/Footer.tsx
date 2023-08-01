'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from '@prisma/client';
import { COLORS } from '@/constants/colors';

const FooterContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  padding: 1% 0 1% 0;
  box-shadow: 0px -6px 6px -6px rgba(0, 0, 0, 0.1);
`;

const MenuElement = styled.a`
  text-align: center;
  padding: 2px 4px;
  color: ${COLORS.darkGray};
  cursor: pointer;
  transition: text-decoration 0.3s;
  font-weight: 500;
  font-size: 12px;
  transition: font-weight 0.2s;
  &:hover {
    font-weight: 800;
  }
`;

const FooterText = styled.p`
  display: flex;
  justify-content: center;
  color: ${COLORS.darkGray};
`;

const LogoTitle = styled.a`
  color: ${COLORS.darkGray};
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  justify-content: left;
  flex: 2 1 auto;
  margin: 0 0 0 24px;
`;
const Footer = () => {
  return (
    <FooterContainer>
      <div
        className='    
            max-w-[2520px]
            mx-auto 
            xl:px-10
            md:px-10
            sm: px-2'
      >
        <LogoTitle>KONAK KÜLTÜR SANAT AKADEMİSİ</LogoTitle>
        <FooterText>
          &copy; {new Date().getFullYear()} Konak Kültür Sanat Akademisi. Tüm
          hakları saklıdır.
        </FooterText>
      </div>
    </FooterContainer>
  );
};

export default Footer;
