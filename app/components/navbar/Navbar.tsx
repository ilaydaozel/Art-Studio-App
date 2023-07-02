'use client';
import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import MenuElement from './MenuElement';
import MenuContainer from './MenuContainer';
import LogoTitle from './LogoTitle';
import RegisterModal from '../modal/RegisterModal';
import UserMenu from './UserMenu';
import { SafeUser } from '@/app/types';
import ArtworkContainer from '../artwork/ArtworkContainer';

interface NavbarProps {
  currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log({ currentUser });
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div
        className='
       py-2
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
            <MenuContainer>
              <MenuElement address='/' displayName='Anasayfa' />
              <MenuElement address='/sanatcilar' displayName='Sanatçılar' />
              <MenuElement address='/hakkında' displayName='Hakkında' />
            </MenuContainer>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <ArtworkContainer label='atiye' />
      <ArtworkContainer label='ilayda' />
    </div>
  );
};

export default Navbar;
