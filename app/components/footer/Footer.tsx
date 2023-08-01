'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS, ROUTE_NAMES } from '@/constants/routes';

const FooterContainer = styled.div<{ isVisible: boolean; translateY: number }>`
  position: fixed;
  left: 0;
  bottom: ${(props) => (props.isVisible ? '0' : `-${props.translateY}px`)};
  width: 100%;
  background-color: #ffffff;
  padding: 1% 0 1% 0;
  box-shadow: 0px -6px 6px -6px rgba(0, 0, 0, 0.1);
  transition: bottom 0.4s ease-in-out;
`;

const FooterElement = styled.a`
  text-align: center;
  color: ${COLORS.darkGray};
  cursor: pointer;
  font-weight: 500;
  font-size: 10px;
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
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  cursor: pointer;
  display: flex;
  justify-content: left;
  flex: 2 1 auto;
`;

const Footer = () => {
  const [isVisible, setIsVisible] = useState(
    document.documentElement.scrollHeight <= window.innerHeight
  );
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isOnBottom =
        document.documentElement.clientHeight + window.scrollY >=
        (document.documentElement.scrollHeight ||
          document.documentElement.clientHeight);
      console.log('isOnBottom ', isOnBottom);
      setIsVisible(isOnBottom);
    };

    const handleResize = () => {
      setFooterHeight(footerRef.current?.scrollHeight || 0);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize footer height on mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [footerHeight]);

  const footerRef = React.useRef<HTMLDivElement>(null);

  return (
    <FooterContainer
      isVisible={isVisible}
      translateY={footerHeight}
      ref={footerRef}
    >
      <div
        className='    
            max-w-[2520px]
            mx-auto 
            xl:px-10
            md:px-10
            sm: px-2'
      >
        <div className='flex flex-col items-start '>
          <LogoTitle>KONAK KÜLTÜR SANAT AKADEMİSİ</LogoTitle>
          <div className='flex flex-col gap-1 items-start my-2'>
            <FooterElement href={ROUTE_PATHS.HOME}>
              {ROUTE_NAMES.HOME}
            </FooterElement>
            <FooterElement href={ROUTE_PATHS.ARTISTS}>
              {ROUTE_NAMES.ARTISTS}
            </FooterElement>
            <FooterElement href={ROUTE_PATHS.ABOUT}>
              {ROUTE_NAMES.ABOUT}
            </FooterElement>
          </div>
        </div>

        <FooterText>
          &copy; {new Date().getFullYear()} Konak Kültür Sanat Akademisi. Tüm
          hakları saklıdır.
        </FooterText>
      </div>
    </FooterContainer>
  );
};

export default Footer;
