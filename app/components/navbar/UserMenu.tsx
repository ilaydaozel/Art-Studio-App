'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import UserMenuElement from './UserMenuElement';
import Avatar from '../Avatar';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  const registerModal = useRegisterModal();
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
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          '
      >
        <div className='hidden md:block'>
          <Avatar />
        </div>
        <AiOutlineMenu />
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
            w-[15vw]
          '
        >
          <div className='inline-flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <UserMenuElement
                  label='Sayfam'
                  onClick={registerModal.onOpen}
                />
                <UserMenuElement
                  label='Resimlerim'
                  onClick={loginModal.onOpen}
                />
                <UserMenuElement label='Çıkış Yap' onClick={() => signOut()} />
              </>
            ) : (
              <>
                <UserMenuElement
                  label='Giriş Yap'
                  onClick={loginModal.onOpen}
                />
                <UserMenuElement
                  label='Kaydol'
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
