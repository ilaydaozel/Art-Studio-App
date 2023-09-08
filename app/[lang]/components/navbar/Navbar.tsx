'use client';

import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import useLoginModal from '@/app/[lang]/hooks/useLoginModal';
import { ROUTE_PATHS } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { PiUserCircleLight } from 'react-icons/pi';
import { IUser } from '@/app/[lang]/types';
import LanguageSwitcher from './LanguageSwitcher';
import { i18n } from '@/i18n.config';
import LoginModal from '../modal/LoginModal';
import { useTranslation } from '../../contexts/TranslationContext';

interface NavbarProps {
  currentUser: IUser | null;
}

const NavbarContainer = styled.div<{ bgColor: string }>`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  z-index: 10;
  padding: 2% 0 2% 0;
  box-shadow: ${(props) =>
    props.bgColor != '#FFFFFF' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  transition: background-color 0.6s ease;
`;

const LogoTitle = styled.a<{ color: string }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${(props) => props.color};
  font-size: 1.5rem;
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
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 576px) {
    font-size: 0.6rem;
  }
`;
const SideIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const MenuElement = styled.a<{ color: string; isActive?: boolean }>`
  text-align: center;
  padding: 2px 4px;
  color: ${(props) => props.color};
  cursor: pointer;
  transition: text-decoration 0.3s;
  font-weight: ${(props) => (props.isActive ? 800 : 500)};
  font-size: 0.8rem;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 992px) {
    font-size: 0.8rem;
  }
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
  @media (max-width: 576px) {
    font-size: 0.4rem;
  }
`;
const Navbar = ({ currentUser }: NavbarProps) => {
  const { navbar } = useTranslation();
  const { academy, route_names, login_modal } = navbar;
  const loginModal = useLoginModal();
  const pathname = usePathname();

  const isHomePage =
    i18n.locales.find((locale) => pathname === `/${locale}`) !== undefined;

  const [backgroundColor, setBackgroundColor] = useState(
    isHomePage ? 'transparent' : 'rgba(255, 255, 255, 0.1)'
  );
  const [logoColor, setLogoColor] = useState(
    isHomePage ? '#FFFFFF' : COLORS.darkGray
  );
  const [menuElementColor, setMenuElementColor] = useState(
    isHomePage ? '#FFFFFF' : COLORS.darkGray
  );

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the top of the page
      const isOnTop = window.scrollY === 0;
      if (isHomePage) {
        setBackgroundColor(isOnTop ? 'transparent' : '#FFFFFF');
        setLogoColor(isOnTop ? '#FFFFFF' : COLORS.darkGray);
        setMenuElementColor(isOnTop ? '#FFFFFF' : COLORS.darkGray);
      } else {
        setBackgroundColor(isOnTop ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF');
        setLogoColor(COLORS.darkGray);
        setMenuElementColor(COLORS.darkGray);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <NavbarContainer bgColor={backgroundColor}>
      <div
        className='    
            max-w-[2520px]
            mx-auto 
            xl:px-10
            md:px-10
            sm:px-2'
      >
        <div
          className='
          flex
          flex-col
          flex-grow
          items-center
          justify-between
          gap-1
          '
        >
          <div className='w-full relative flex items-center justify-end'>
            <LogoTitle color={logoColor} href='/'>
              {academy.name}
            </LogoTitle>
            <SideIcons>
              <LoginModal messages={login_modal} />
              <LanguageSwitcher />
              {currentUser ? (
                <UserMenu currentUser={currentUser} routeNames={route_names} />
              ) : (
                <MenuElement
                  color={menuElementColor}
                  onClick={loginModal.onOpen}
                >
                  <PiUserCircleLight className='sm:h-[28px] sm:w-[28px] text-neutral-400 w-[20px] h-[20px]' />
                </MenuElement>
              )}
            </SideIcons>
          </div>

          <div className='flex flex-row gap-2 items-center'>
            <MenuElement
              isActive={pathname === ROUTE_PATHS.HOME}
              color={menuElementColor}
              href={ROUTE_PATHS.HOME}
            >
              {route_names.home}
            </MenuElement>
            <MenuElement
              isActive={pathname === ROUTE_PATHS.ARTISTS}
              color={menuElementColor}
              href={ROUTE_PATHS.ARTISTS}
            >
              {route_names.artists}
            </MenuElement>
            <MenuElement
              isActive={pathname === ROUTE_PATHS.ABOUT}
              color={menuElementColor}
              href={ROUTE_PATHS.ABOUT}
            >
              {route_names.about}
            </MenuElement>
            <MenuElement
              isActive={pathname === ROUTE_PATHS.VIRTUAL_EXHIBITIONS}
              color={menuElementColor}
              href={ROUTE_PATHS.VIRTUAL_EXHIBITIONS}
            >
              {route_names.virtual_exhibitions}
            </MenuElement>
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
