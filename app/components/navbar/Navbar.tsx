'use client';
import React from 'react';
import Logo from './Logo';
import MenuElement from './MenuElement';
import RegisterModal from '../modal/RegisterModal';
import UserMenu from './UserMenu';
import ArtworkContainer from '../artwork/ArtworkContainer';
import styled from 'styled-components';
import { User } from '@prisma/client';
import { COLORS } from '@/constants/colors';
interface NavbarProps {
  currentUser: User | null;
}
const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const LogoTitle = styled.text`
  font-weight: 700;
  color: ${COLORS.darkGray};
  font-size: 13px;
`;
const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className='pt-16 mt-1'>
      <NavbarContainer>
        <div
          className='
       py-4
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
          items-center
          justify-between
          gap-2'
              >
                <Logo height={30} width={30} />
                <div className='flex flex-col'>
                  <LogoTitle>KONAK KÜLTÜR</LogoTitle>
                  <LogoTitle>SANAT AKADEMİSİ</LogoTitle>
                </div>
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
                <MenuElement address='/ekle/eser' displayName='ESER EKLE' />
                <MenuElement
                  address='/ekle/sanatci'
                  displayName='SANATÇI EKLE'
                />
              </div>

              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </div>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
