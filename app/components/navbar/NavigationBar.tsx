import useTranslate from '@/app/hooks/useTranslate';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  @media (max-width: 576px) {
    font-size: 0.6rem;
  }
`;

const NavigationBar = () => {
  const pathname = usePathname();
  const [menuElementColor, setMenuElementColor] = useState(
    pathname === ROUTE_PATHS.HOME ? '#FFFFFF' : COLORS.darkGray
  );
  const t = useTranslate();

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the top of the page
      const isOnTop = window.scrollY === 0;
      if (pathname === ROUTE_PATHS.HOME) {
        setMenuElementColor(isOnTop ? '#FFFFFF' : COLORS.darkGray);
      } else {
        setMenuElementColor(COLORS.darkGray);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const location = { element: 'route_names' };

  return (
    <div className='flex flex-row gap-2 items-center'>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.HOME}
        color={menuElementColor}
        href={ROUTE_PATHS.HOME}
      >
        {t('home', location)}
      </MenuElement>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.ARTISTS}
        color={menuElementColor}
        href={ROUTE_PATHS.ARTISTS}
      >
        {t('artists', location)}
      </MenuElement>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.EXHIBITIONS}
        color={menuElementColor}
        href={ROUTE_PATHS.EXHIBITIONS}
      >
        {t('exhibitions', location)}
      </MenuElement>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.ABOUT}
        color={menuElementColor}
        href={ROUTE_PATHS.ABOUT}
      >
        {t('about', location)}
      </MenuElement>
      <MenuElement
        isActive={pathname === ROUTE_PATHS.CONTACT}
        color={menuElementColor}
        href={ROUTE_PATHS.CONTACT}
      >
        {t('contact', location)}
      </MenuElement>
    </div>
  );
};
export default NavigationBar;
