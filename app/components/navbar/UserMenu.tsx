'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS, ROUTE_NAMES } from '@/constants/routes';
interface UserMenuProps {
  currentUser: User | null;
}

const MenuContainer = styled.div`
  position: absolute;
  right: 0;
  top: 4rem;
  width: 20vw;
  max-width: 20rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-size: 0.875rem; /* text-sm is roughly equivalent to 0.875rem */
`;
const UserMenuElement = styled.a`
  width: 100%;
  margin: 6px 8px 4px 0;
  padding: 0 4px;
  color: ${COLORS.darkGray};
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 12px;
  &:hover {
    font-weight: 700;
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
        <AiOutlineMenu className='w-[24px] h-[20px] text-neutral-400 ' />
      </div>
      {isOpen && (
        <MenuContainer>
          <div className='inline-flex flex-col cursor-pointer w-full '>
            <>
              {currentUser?.userType === 'artist' ? (
                <div className='flex flex-col items-center justify-center p-2'>
                  <div className='text-md font-semibold mt-3 mb-1 w-full m-auto'>
                    SANATÇI MENÜSÜ
                  </div>
                  <UserMenuElement
                    href={`${ROUTE_PATHS.MY_PROFILE}/${currentUser?.id}`}
                  >
                    {ROUTE_NAMES.MY_PROFILE}
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
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center m-2 w-full'>
                  <div className='text-md font-semibold mt-3 mb-1 w-full m-auto'>
                    ADMİN MENÜSÜ
                  </div>
                  <UserMenuElement href={ROUTE_PATHS.EDIT_ARTIST}>
                    {ROUTE_NAMES.EDIT_ARTIST}
                  </UserMenuElement>
                  <UserMenuElement href={ROUTE_PATHS.ADD_ARTIST}>
                    {ROUTE_NAMES.ADD_ARTIST}
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
                </div>
              )}
            </>
          </div>
        </MenuContainer>
      )}
    </div>
  );
};

export default UserMenu;
