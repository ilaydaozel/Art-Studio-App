'use client';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS } from '@/constants/routes';
import useTranslate from '../../hooks/useTranslate';
import GoogleMapsWidget from '../utils/GoogleMapsWidget';
import SocialMedia from '../utils/SocialMedia';

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${COLORS.darkGray};
  opacity: 0.6;
  padding: 1% 0 1% 0;
  box-shadow: 0px -6px 6px -6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.6s ease-in-out;
`;

const FooterElement = styled.a`
  text-align: center;
  color: ${COLORS.lightGray};
  cursor: pointer;
  font-weight: 500;
  font-size: 0.7rem;
  transition: font-weight 0.2s;
  &:hover {
    font-weight: bold;
  }
`;

const FooterText = styled.p`
  display: flex;
  justify-content: center;
  color: ${COLORS.gray};
  font-size: 1rem;
  @media (max-width: 567px) {
    font-size: 0.8rem;
  }
`;

const LogoTitle = styled.a`
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 1.5px;
  cursor: pointer;
  display: flex;
  justify-content: left;
  flex: 2 1 auto;
`;

const Footer = () => {
  const t = useTranslate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    const footer = entry.target as HTMLDivElement;
    if (entry.isIntersecting) {
      footer.style.opacity = '1';
    } else {
      footer.style.opacity = '0.6';
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });
    observer.observe(container);
    return () => {
      observer.unobserve(container);
    };
  }, []);

  const routesLocation = {
    element: 'route_names',
  };
  const location = {
    element: 'footer',
  };

  return (
    <FooterContainer ref={containerRef}>
      <div
        className='    
            max-w-[2520px]
            mx-auto 
            xl:px-10
            md:px-10
            sm: px-2'
      >
        <div className='flex flex-col items-start gap-2 '>
          <LogoTitle>{t('name', { element: 'academy' })}</LogoTitle>
          <div className='w-[90%] flex flex-row gap-2 justify-between'>
            <div className='flex flex-col items-start justify-center gap-2'>
              <FooterElement href={ROUTE_PATHS.HOME}>
                {t('home', routesLocation)}
              </FooterElement>
              <FooterElement href={ROUTE_PATHS.ARTISTS}>
                {t('artists', routesLocation)}
              </FooterElement>
              <FooterElement href={ROUTE_PATHS.EXHIBITIONS}>
                {t('exhibitions', routesLocation)}
              </FooterElement>
              <FooterElement href={ROUTE_PATHS.ABOUT}>
                {t('about', routesLocation)}
              </FooterElement>
              <FooterElement href={ROUTE_PATHS.CONTACT}>
                {t('contact', routesLocation)}
              </FooterElement>
            </div>
            <GoogleMapsWidget
              mapContainerStyle={{ width: '40%', height: '200px' }}
            />
          </div>
        </div>
        <SocialMedia></SocialMedia>
        <FooterText>
          &copy; {new Date().getFullYear()} {t('name', { element: 'academy' })}.{' '}
          {t('all_rights_deserved_text', location)}
        </FooterText>
      </div>
    </FooterContainer>
  );
};

export default Footer;
