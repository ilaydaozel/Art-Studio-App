'use client';

import useTranslate from '@/app/hooks/useTranslate';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.8rem;
`;

const MenuElement = styled.a<{ isActive?: boolean }>`
  color: ${COLORS.gray};
  font-weight: ${(props) => props.isActive && 'bold'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 0.7rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.8px;
    background-color: ${COLORS.gray + '50'};
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: translateX(0);
  }
`;

const CommonMenu = () => {
  const pathname = usePathname();
  const t = useTranslate();
  const location = { element: 'route_names' };

  return (
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
    </MenuContainer>
  );
};
export default CommonMenu;
