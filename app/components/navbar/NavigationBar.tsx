'use client';

import React from 'react';
import useTranslate from '@/app/hooks/useTranslate';
import { ROUTE_PATHS } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

interface NavigationBarProps {
  color: string;
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  justify-items: center;
  align-items: center;
`;

const MenuElement = styled.a<{ color: string; isActive?: boolean }>`
  text-align: center;
  padding: 2px 4px;
  color: ${(props) => props.color};
  cursor: pointer;
  transition: text-decoration 0.3s;
  font-weight: ${(props) => props.isActive && 'bold'};
  font-size: 0.85rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.8px;
    background-color: ${(props) => props.color + '50'};
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: translateX(0);
  }

  @media (max-width: 992px) {
    font-size: 0.8rem;
  }
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const NavigationBar = ({ color }: NavigationBarProps) => {
  const pathname = usePathname();
  const t = useTranslate();

  const location = { element: 'route_names' };

  return (
    <MenuContainer>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.HOME}
        color={color}
        href={ROUTE_PATHS.HOME}
      >
        {t('home', location)}
      </MenuElement>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.ARTISTS}
        color={color}
        href={ROUTE_PATHS.ARTISTS}
      >
        {t('artists', location)}
      </MenuElement>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.EXHIBITIONS}
        color={color}
        href={ROUTE_PATHS.EXHIBITIONS}
      >
        {t('exhibitions', location)}
      </MenuElement>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.ABOUT}
        color={color}
        href={ROUTE_PATHS.ABOUT}
      >
        {t('about', location)}
      </MenuElement>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.CONTACT}
        color={color}
        href={ROUTE_PATHS.CONTACT}
      >
        {t('contact', location)}
      </MenuElement>
    </MenuContainer>
  );
};

export default NavigationBar;
