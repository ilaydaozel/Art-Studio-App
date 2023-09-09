'use client';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS } from '@/constants/routes';
import { TranslationContext } from '@/app/contexts/TranslationContext';
import useTranslate from '../../hooks/useTranslate';

const FooterContainer = styled.div<{ isVisible: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.isVisible ? COLORS.darkGray : 'transparent'};
  padding: 1% 0 1% 0;
  box-shadow: 0px -6px 6px -6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.6s ease-in-out;
`;

const FooterElement = styled.a`
  text-align: center;
  color: ${COLORS.lightGray};
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
  color: ${COLORS.gray};
`;

const LogoTitle = styled.a`
  color: #ffffff;
  font-size: 0.9rem;
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
        document.documentElement.clientHeight + window.scrollY + 100 >=
        (document.documentElement.scrollHeight ||
          document.documentElement.clientHeight);
      setIsVisible(isOnBottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [footerHeight]);

  const footerRef = React.useRef<HTMLDivElement>(null);

  const t = (text: string): string => {
    return useTranslate(text, {
      element: 'route_names',
    });
  };

  return (
    <FooterContainer isVisible={isVisible} ref={footerRef}>
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
            <FooterElement href={ROUTE_PATHS.HOME}>{t('home')}</FooterElement>
            <FooterElement href={ROUTE_PATHS.ARTISTS}>
              {t('artists')}
            </FooterElement>
            <FooterElement href={ROUTE_PATHS.ABOUT}>{t('about')}</FooterElement>
            <FooterElement href={ROUTE_PATHS.VIRTUAL_EXHIBITIONS}>
              {t('virtual_exhibitions')}
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
