'use client';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import UserMenu from './UserMenu';
import ArtworkContainer from '../artwork/ArtworkContainer';
import styled from 'styled-components';
import { User } from '@prisma/client';
import { COLORS } from '@/constants/colors';
import useLoginModal from '@/app/hooks/useLoginModal';
interface NavbarProps {
  currentUser: User | null;
}
const NavbarContainer = styled.div<{ bgColor: string }>`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const LogoTitle = styled.a`
  font-weight: 600;
  color: ${COLORS.darkGray};
  font-size: 1.1rem;
  cursor: pointer;
`;

const MenuElement = styled.a`
  text-align: center;
  padding: 2px 4px;
  color: ${COLORS.darkGray};
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  font-size: 12px;
  &:hover {
    font-weight: bold;
  }
`;
const Navbar = ({ currentUser }: NavbarProps) => {
  const loginModal = useLoginModal();
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  return (
    <div className='pt-16 mt-1'>
      <NavbarContainer bgColor={backgroundColor}>
        <div
          className='
       py-5
       border-b-[1px]'
        >
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
          flex-row
          flex-grow
          items-center
          justify-between
          gap-6
          md:gap-0'
            >
              <div
                className='
          flex
          flex-row
          items-baseline
          justify-between
          gap-2'
              >
                <div className='flex flex-col'>
                  <LogoTitle href='/'>KONAK KÜLTÜR SANAT AKADEMİSİ</LogoTitle>
                </div>
              </div>
              <div className='flex flex-row gap-6 items-center'>
                <MenuElement href='/'>ANASAYFA</MenuElement>
                <MenuElement href='/sanatcilar'>SANATÇILAR</MenuElement>
                <MenuElement href='/hakkinda'>HAKKINDA</MenuElement>
                {currentUser ? (
                  <UserMenu currentUser={currentUser} />
                ) : (
                  <MenuElement onClick={loginModal.onOpen}>GİRİŞ</MenuElement>
                )}
              </div>
            </div>
          </div>
        </div>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
