'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS, ROUTE_NAMES } from '@/constants/routes';
import { IUser } from '@/app/[lang]/actions/type';

interface UserMenuProps {
  currentUser: IUser | null;
}

const MenuContainer = styled.div`
  position: absolute;
  right: 0;
  top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 20vw;
  padding: 16px 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    width: 30vw;
  }
  @media (max-width: 480px) {
    width: 40vw;
  }
`;
const UserMenuElement = styled.a`
  color: ${COLORS.darkGray};
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 0.7rem;
  &:hover {
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const UserTitle = styled.div`
  color: ${COLORS.darkGray};
  font-weight: 600;
  padding: 2px 10px 2px 10px;
  border-bottom: 1px solid ${COLORS.lightGray};
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const menuRef = useRef<HTMLDivElement>(null); // Specify the type of menuRef

  // Use useEffect to add a click event listener when the component mounts
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the menu and the menu is open, close it
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    // Add the event listener to 'document'
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className='relative' ref={menuRef}>
      <div
        onClick={toggleOpen}
        className='
          flex 
          flex-row 
          items-center 
          justify-center
          cursor-pointer 
          gap-1
          '
      >
        <AiOutlineMenu className='md:w-[24px] md:h-[20px] w-[20px] h-[18px] text-neutral-400' />
      </div>
      {isOpen && (
        <>
          {currentUser?.userType === 'artist' ? (
            <MenuContainer>
              <UserTitle>SANATÇI</UserTitle>
              <UserMenuElement
                href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${currentUser?.id}`}
              >
                {ROUTE_NAMES.EDIT_ARTIST_PROFILE}
              </UserMenuElement>
              <UserMenuElement
                href={ROUTE_PATHS.HOME}
                onClick={() => {
                  signOut();
                  router.refresh();
                }}
              >
                ÇIKIŞ YAP
              </UserMenuElement>
            </MenuContainer>
          ) : (
            <MenuContainer>
              <UserTitle>ADMİN</UserTitle>
              <UserMenuElement
                href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_ACCOUNTS}`}
              >
                {ROUTE_NAMES.EDIT_ARTIST_ACCOUNTS}
              </UserMenuElement>
              <UserMenuElement
                href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ANNOUNCEMENTS}`}
              >
                {ROUTE_NAMES.EDIT_ANNOUNCEMENTS}
              </UserMenuElement>
              <UserMenuElement
                href={`${ROUTE_PATHS.ADD}${ROUTE_PATHS.ADD_NEW_ARTIST}`}
              >
                {ROUTE_NAMES.ADD_NEW_ARTIST}
              </UserMenuElement>

              <UserMenuElement
                href={ROUTE_PATHS.HOME}
                onClick={() => {
                  signOut();
                  router.refresh();
                }}
              >
                Çıkış Yap
              </UserMenuElement>
            </MenuContainer>
          )}
        </>
      )}
    </div>
  );
};

export default UserMenu;
