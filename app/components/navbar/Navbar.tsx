'use client';
import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import MenuElement from './MenuElement';
import LogoTitle from './LogoTitle';
import RegisterModal from '../modal/RegisterModal';
import UserMenu from './UserMenu';
import { SafeUser } from '@/app/types';
import ArtworkContainer from '../artwork/ArtworkContainer';
import styled from 'styled-components';
interface NavbarProps {
  currentUser?: SafeUser | null;
}
const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Navbar = ({ currentUser = undefined }: NavbarProps) => {
  console.log({ currentUser });
  return (
    <div
      className='
      h-14'
    >
      <NavbarContainer>
        <div
          className='
       py-3
       border-b-[1px]'
        >
          <Container>
            <div
              className='
          flex
          flex-row
          items-center
          justify-between
          gap-3
          md:gap-0'
            >
              <div
                className='
          flex
          flex-row
          items-center
          justify-between
          gap-2'
              >
                <Logo height={30} width={30} />
                <LogoTitle>KONAK KÜLTÜR SANAT AKADEMİSİ</LogoTitle>
              </div>
              <div
                className='
              flex
              flex-row
              justify-between
              gap-12
             '
              >
                <MenuElement address='/' displayName='ANASAYFA' />
                <MenuElement address='/sanatcilar' displayName='SANATÇILAR' />
                <MenuElement address='/hakkinda' displayName='HAKKINDA' />
              </div>

              <UserMenu currentUser={currentUser} />
            </div>
          </Container>
        </div>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
