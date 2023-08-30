'use client';
import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import useLoginModal from '@/app/hooks/useLoginModal';
import { ROUTE_NAMES, ROUTE_PATHS } from '@/constants/routes';
import { usePathname, useRouter } from 'next/navigation';
import { PiUserCircleLight } from 'react-icons/pi';
import { IUser } from '@/app/actions/type';
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
  color: ${(props) => props.color};
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex: 2 1 auto;
  margin: 0 0 0 24px;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
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
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;
const Navbar = ({ currentUser }: NavbarProps) => {
  const loginModal = useLoginModal();
  const path = usePathname();
  const [backgroundColor, setBackgroundColor] = useState(
    path === ROUTE_PATHS.HOME ? 'transparent' : 'rgba(255, 255, 255, 0.1)'
  );
  const [logoColor, setLogoColor] = useState(
    path === ROUTE_PATHS.HOME ? '#FFFFFF' : COLORS.darkGray
  );
  const [menuElementColor, setMenuElementColor] = useState(
    path === ROUTE_PATHS.HOME ? '#FFFFFF' : COLORS.darkGray
  );

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the top of the page
      const isOnTop = window.scrollY === 0;
      if (path === ROUTE_PATHS.HOME) {
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
  }, [path]);

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
          <div className='w-full flex items-center'>
            <LogoTitle color={logoColor} href='/'>
              KONAK KÜLTÜR SANAT AKADEMİSİ
            </LogoTitle>
            {currentUser ? (
              <UserMenu currentUser={currentUser} />
            ) : (
              <MenuElement color={menuElementColor} onClick={loginModal.onOpen}>
                <PiUserCircleLight className='sm:h-[24px] sm:w-[24px] text-neutral-400 w-[20px] h-[20px]' />
              </MenuElement>
            )}
          </div>

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
            <MenuElement
              isActive={path === ROUTE_PATHS.VIRTUAL_EXHIBITION}
              color={menuElementColor}
              href={ROUTE_PATHS.VIRTUAL_EXHIBITION}
            >
              {ROUTE_NAMES.VIRTUAL_EXHIBITION}
            </MenuElement>
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
