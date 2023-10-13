'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS } from '@/constants/routes';
import useTranslate from '../../hooks/useTranslate';
import { IUser } from '@/app/types';
import UserMenu from './UserMenu';

interface NavigationBarHamburgerProps {
  user?: IUser | null;
}

const MenuContainer = styled.div`
  position: absolute;
  right: 0;
  top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 97vw;
  padding: 16px 8px;
  background-color: rgba(255, 255, 255);
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  overlow-x: hidden;
  font-size: 0.8rem;
`;

const MenuElement = styled.a<{ isActive?: boolean }>`
  color: ${COLORS.darkGray};
  font-weight: ${(props) => props.isActive && 'bold'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 0.8rem;
  &:hover {
    font-weight: 700;
  }
`;

const NavigationBarHamburger = ({ user }: NavigationBarHamburgerProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const menuRef = useRef<HTMLDivElement>(null); // Specify the type of menuRef

  const location = { element: 'route_names' };
  const t = useTranslate();

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
        <AiOutlineMenu
          className='md:w-[24px] md:h-[20px] w-[20px] h-[18px]'
          style={{ color: COLORS.gray }}
        />
      </div>
      {isOpen && (
        <MenuContainer>
          <MenuElement
            isActive={pathname === ROUTE_PATHS.HOME}
            href={ROUTE_PATHS.HOME}
          >
            {t('home', location)}
          </MenuElement>
          <MenuElement
            isActive={pathname === ROUTE_PATHS.ARTISTS}
            href={ROUTE_PATHS.ARTISTS}
          >
            {t('artists', location)}
          </MenuElement>
          <MenuElement
            isActive={pathname === ROUTE_PATHS.EXHIBITIONS}
            href={ROUTE_PATHS.EXHIBITIONS}
          >
            {t('exhibitions', location)}
          </MenuElement>
          <MenuElement
            isActive={pathname === ROUTE_PATHS.ABOUT}
            href={ROUTE_PATHS.ABOUT}
          >
            {t('about', location)}
          </MenuElement>
          <MenuElement
            isActive={pathname === ROUTE_PATHS.CONTACT}
            href={ROUTE_PATHS.CONTACT}
          >
            {t('contact', location)}
          </MenuElement>
          {user && <UserMenu user={user} />}
        </MenuContainer>
      )}
    </div>
  );
};

export default NavigationBarHamburger;
