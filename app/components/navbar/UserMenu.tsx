'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS } from '@/constants/routes';
import { IUser } from '@/app/types';
import useTranslate from '../../hooks/useTranslate';

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
  font-size: 0.8rem;
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

const NameText = styled.div`
  color: ${COLORS.darkGray};
  width: 100%;
  font-size: 0.9rem;
  font-weight: bold;
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

  const useT = (text: string): string => {
    return useTranslate(text, {
      element: 'route_names',
    });
  };

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
        <MenuContainer>
          <NameText>
            {currentUser?.name} {currentUser?.surname}
          </NameText>
          {currentUser?.userType === 'artist' ? (
            <>
              <UserMenuElement
                href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${currentUser?.id}`}
              >
                {useT('edit_artist_profiles')}
              </UserMenuElement>
            </>
          ) : (
            <>
              <UserMenuElement
                href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_ACCOUNTS}`}
              >
                {useT('edit_artist_accounts')}
              </UserMenuElement>
              <UserMenuElement
                href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ANNOUNCEMENTS}`}
              >
                {useT('edit_announcements')}
              </UserMenuElement>
              <UserMenuElement
                href={`${ROUTE_PATHS.ADD}${ROUTE_PATHS.ADD_NEW_ARTIST}`}
              >
                {useT('add_new_artist')}
              </UserMenuElement>
            </>
          )}
          <UserMenuElement
            href={ROUTE_PATHS.HOME}
            onClick={() => {
              signOut();
              router.refresh();
            }}
          >
            {useT('logout')}
          </UserMenuElement>
        </MenuContainer>
      )}
    </div>
  );
};

export default UserMenu;
