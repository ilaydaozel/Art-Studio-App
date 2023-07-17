'use client';

import { useCallback, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/app/hooks/useLoginModal';

import UserMenuElement from './UserMenuElement';
import Avatar from '../Avatar';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
interface UserMenuProps {
  currentUser: User | null;
}

const UserTypeText = styled.text`
  color: ${COLORS.darkGray};
  cursor: pointer;
  padding: 2px 4px;
  font-weight: 600;
  font-size: 12px;
  &:hover {
    font-weight: bold;
  }
`;
const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className='relative'>
      <div
        onClick={toggleOpen}
        className='
          p-2
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-2
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          '
      >
        <div className='hidden md:block'>
          {currentUser?.userType === 'admin' ? (
            <UserTypeText>ADMİN</UserTypeText>
          ) : (
            <UserTypeText>SANATÇI</UserTypeText>
          )}
        </div>
        <AiOutlineMenu className='h-[16px] text-neutral-400 ' />
      </div>
      <div></div>
      {isOpen && (
        <div
          className='
            absolute 
            rounded-xl 
            shadow-md           
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            sm:m-4
            w-[15vw]
            md:w-[20vw]
            sm:w-[30vw]
          '
        >
          <div className='inline-flex flex-col cursor-pointer'>
            <>
              {currentUser?.userType === 'artist' ? (
                <div>
                  <div className='flex flex-col items-center justify-center m-2 w-full'>
                    <div className='text-md font-semibold border-solid border-b-[1px] w-full m-auto'>
                      SANATÇI MENÜSÜ
                    </div>
                  </div>
                  <UserMenuElement
                    label='Sayfamı Düzenle'
                    onClick={() => router.push(`/sayfam/${currentUser?.id}`)}
                  ></UserMenuElement>
                  <UserMenuElement
                    label='Çıkış Yap'
                    onClick={() => {
                      signOut();
                      router.refresh();
                      router.push('/');
                    }}
                  />
                </div>
              ) : (
                <div>
                  <div className='flex flex-col items-center justify-center m-2 w-full'>
                    <div className='text-md font-semibold border-solid border-b-[1px] w-full m-auto'>
                      ADMİN MENÜSÜ
                    </div>
                  </div>
                  <UserMenuElement
                    label='Yeni Sanatçı Ekle'
                    onClick={() => router.push(`/ekle/sanatci`)}
                  ></UserMenuElement>
                  <UserMenuElement
                    label='Çıkış Yap'
                    onClick={() => {
                      signOut();
                      router.refresh();
                      router.push('/');
                    }}
                  />
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
