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
  color: string;
}

const Container = styled.div<{ isSmallScreen: boolean }>`
  position: absolute;
  right: -0.4rem;
  top: ${(props) => (props.isSmallScreen ? '2rem' : '4rem')};
  width: ${(props) => (props.isSmallScreen ? '100vw' : '20vw')};
  background-color: rgba(255, 255, 255);
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  overflow: auto;
  padding: 2rem 0 1.4rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;

const HamburgerIcon = styled.div`
  display: flex;
  align-items: baseline;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1px 3fr;
  gap: 2rem;
`;

const NameText = styled.div`
  color: ${COLORS.darkGray};
  width: 100%;
  font-size: 0.8rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SeperatorLine = styled.div`
  background-color: ${COLORS.lightGray};
  height: 100%;
`;
const NavigationBarHamburger = ({
  user,
  isSmallScreen,
  color,
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
          className='md:w-[24px] md:h-[24px] w-[16px] h-[16px]'
          style={{ color: color }}
        />
      </HamburgerIcon>
      {isOpen && (
        <Container isSmallScreen={isSmallScreen}>
          {user && (
            <NameText>
              {user.name[0].toLocaleUpperCase('tr') + user.name.slice(1)}{' '}
              {user.surname[0].toLocaleUpperCase('tr') + user.surname.slice(1)}
            </NameText>
          )}

          <MenuContainer>
            {isSmallScreen && <CommonMenu />}
            {isSmallScreen && user && <SeperatorLine />}
            {user && <UserMenu user={user} />}
          </MenuContainer>
        </Container>
      )}
    </div>
  );
};

export default NavigationBarHamburger;
