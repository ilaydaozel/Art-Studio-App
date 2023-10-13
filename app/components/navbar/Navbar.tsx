'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { PiUserCircleLight } from 'react-icons/pi';
import { IUser } from '@/app/types';
import useTranslate from '../../hooks/useTranslate';
import LanguageSwitcher from './LanguageSwitcher';
import NavigationBar from './NavigationBar';
import NavigationBarHamburger from './NavigationBarHamburger';

interface NavbarProps {
  currentUser: IUser | null;
}

const NavbarContainer = styled.div<{ bgColor: string }>`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  z-index: 10;
  padding: 2% 0;
  box-shadow: ${(props) =>
    props.bgColor != '#FFFFFF' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  transition: background-color 0.6s ease;
  @media (max-width: 992px) {
    padding: 3% 0;
  }
  @media (max-width: 768px) {
    padding: 4% 0;
  }
`;

const LogoTitle = styled.a<{ color: string; isSmallScreen: boolean }>`
  position: absolute;
  left: ${(props) => (props.isSmallScreen ? '10%' : '50%')};
  transform: ${(props) =>
    props.isSmallScreen ? 'translateX(-10%)' : 'translateX(-50%)'};
  color: ${(props) => props.color};
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex: 2 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 576px) {
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }
`;

const SideIcons = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 0.4rem;
  align-items: flex-end;
  @media (max-width: 576px) {
    gap: 0.2rem;
  }
`;

const Navbar = ({ currentUser }: NavbarProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === ROUTE_PATHS.HOME;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
  const [backgroundColor, setBackgroundColor] = useState(
    isHomePage ? 'transparent' : 'rgba(255, 255, 255, 0.1)'
  );
  const [logoColor, setLogoColor] = useState(
    isHomePage ? '#FFFFFF' : COLORS.darkGray
  );
  const [menuElementColor, setMenuElementColor] = useState(
    isHomePage ? '#FFFFFF' : COLORS.gray
  );

  const t = useTranslate();

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the top of the page
      const isOnTop = window.scrollY === 0;
      if (isHomePage) {
        setBackgroundColor(isOnTop ? 'transparent' : '#FFFFFF');
        setLogoColor(isOnTop ? '#FFFFFF' : COLORS.darkGray);
        setMenuElementColor(isOnTop ? '#FFFFFF' : COLORS.gray);
      } else {
        setBackgroundColor(isOnTop ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF');
        setLogoColor(COLORS.darkGray);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Listen for window resize to check screen width
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 576);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return (
    <NavbarContainer bgColor={backgroundColor}>
      <div
        className='    
            max-w-[2520px]
            mx-auto 
            md:px-8
            sm:px-2'
      >
        <div
          className='
          w-full
          flex
          flex-col
          flex-grow
          items-center
          justify-between
          gap-2
          '
        >
          <div className='w-full relative flex items-center justify-end'>
            <LogoTitle
              color={logoColor}
              href={ROUTE_PATHS.HOME}
              isSmallScreen={isSmallScreen}
            >
              {t('name', { element: 'academy' })}
            </LogoTitle>

            <SideIcons>
              <LanguageSwitcher color={menuElementColor} />
              {!currentUser && (
                <a href={ROUTE_PATHS.LOGIN}>
                  <PiUserCircleLight
                    style={{ color: menuElementColor }}
                    className='md:h-[24px] md:w-[24px] w-[20px] h-[20px]'
                  />
                </a>
              )}
              {(currentUser || isSmallScreen) && (
                <NavigationBarHamburger
                  user={currentUser}
                  isSmallScreen={isSmallScreen}
                  color={menuElementColor}
                />
              )}
            </SideIcons>
          </div>
          {!isSmallScreen && <NavigationBar color={menuElementColor} />}
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
