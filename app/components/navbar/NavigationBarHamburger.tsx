'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { IUser } from '@/app/types';
import UserMenu from './UserMenu';
import CommonMenu from './CommonMenu';

interface NavigationBarHamburgerProps {
  user?: IUser | null;
  isSmallScreen: boolean;
}

const HamburgerIcon = styled.div`
  display: flex;
  justify-content: flex-center;
  align-items: flex-center;
  cursor: pointer;
`;

const MenuContainer = styled.div<{ isSmallScreen: boolean }>`
  position: absolute;
  right: 0;
  top: ${(props) => (props.isSmallScreen ? '2rem' : '4rem')};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  overlow-x: hidden;
  width: ${(props) => (props.isSmallScreen ? '97vw' : '20vw')};
  padding: 16px 8px;
  background-color: rgba(255, 255, 255);
`;

const NavigationBarHamburger = ({
  user,
  isSmallScreen,
}: NavigationBarHamburgerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const menuRef = useRef<HTMLDivElement>(null); // Specify the type of menuRef

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='relative' ref={menuRef}>
      <HamburgerIcon onClick={toggleOpen}>
        <AiOutlineMenu
          className='md:w-[24px] md:h-[20px] w-[20px] h-[18px]'
          style={{ color: COLORS.gray }}
        />
      </HamburgerIcon>
      {isOpen && (
        <MenuContainer isSmallScreen={isSmallScreen}>
          {isSmallScreen && <CommonMenu />}
          {user && <UserMenu user={user} />}
        </MenuContainer>
      )}
    </div>
  );
};

export default NavigationBarHamburger;
