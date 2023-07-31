'use client';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import UserMenu from './UserMenu';
import styled from 'styled-components';
import { User } from '@prisma/client';
import { COLORS } from '@/constants/colors';
import useLoginModal from '@/app/hooks/useLoginModal';
import { ROUTE_NAMES, ROUTE_PATHS } from '@/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
interface NavbarProps {
  currentUser: User | null;
}
const NavbarContainer = styled.div<{ bgColor: string }>`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  z-index: 10;
  padding: 2% 0 2% 0;
  box-shadow: ${(props) =>
    props.bgColor == 'transparent' ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  transition: background-color 0.6s ease;
`;

const LogoTitle = styled.a<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
`;

const MenuElement = styled.a<{ color: string; isActive?: boolean }>`
  text-align: center;
  padding: 2px 4px;
  color: ${(props) => props.color};
  cursor: pointer;
  transition: text-decoration 0.3s;
  font-weight: ${(props) => (props.isActive ? 800 : 500)};
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;
const Navbar = ({ currentUser }: NavbarProps) => {
  const loginModal = useLoginModal();
  const path = usePathname();
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [logoColor, setLogoColor] = useState('#FFFFFF');
  const [menuElementColor, setMenuElementColor] = useState('#FFFFFF');
  const [atHomePage, setAtHomePage] = useState(true);

  useEffect(() => {
    if (path === ROUTE_PATHS.HOME) {
      setAtHomePage(true);
    } else {
      setAtHomePage(false);
    }
  }, [path]);

  useEffect(() => {
    if (atHomePage) {
      const handleScroll = () => {
        // Check if the user has scrolled to the top of the page
        const isOnTop = window.scrollY === 0;
        setBackgroundColor(isOnTop ? 'transparent' : '#FFFFFF');
        setLogoColor(isOnTop ? '#FFFFFF' : COLORS.darkGray);
        setMenuElementColor(isOnTop ? '#FFFFFF' : COLORS.darkGray);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setBackgroundColor('#FFFFFF');
      setLogoColor(COLORS.darkGray);
      setMenuElementColor(COLORS.darkGray);
    }
  }, [atHomePage]);

  return (
    <NavbarContainer bgColor={backgroundColor}>
      <div
        className='    
            max-w-[2520px]
            mx-auto 
            xl:px-10
            md:px-10
            sm: px-2'
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
          <LogoTitle color={logoColor} href='/'>
            KONAK KÜLTÜR SANAT AKADEMİSİ
          </LogoTitle>
          <div className='flex flex-row gap-2 items-center'>
            <MenuElement
              isActive={path === ROUTE_PATHS.HOME}
              color={menuElementColor}
              href={ROUTE_PATHS.HOME}
            >
              {ROUTE_NAMES.HOME}
            </MenuElement>
            <MenuElement
              isActive={path === ROUTE_PATHS.ARTISTS}
              color={menuElementColor}
              href={ROUTE_PATHS.ARTISTS}
            >
              {ROUTE_NAMES.ARTISTS}
            </MenuElement>
            <MenuElement
              isActive={path === ROUTE_PATHS.ABOUT}
              color={menuElementColor}
              href={ROUTE_PATHS.ABOUT}
            >
              {ROUTE_NAMES.ABOUT}
            </MenuElement>
            {currentUser ? (
              <UserMenu currentUser={currentUser} />
            ) : (
              <MenuElement color={menuElementColor} onClick={loginModal.onOpen}>
                GİRİŞ
              </MenuElement>
            )}
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
