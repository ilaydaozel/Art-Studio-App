'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { ROUTE_PATHS } from '@/constants/routes';
import { IUser } from '@/app/types';
import useTranslate from '../../hooks/useTranslate';

interface UserMenuProps {
  user: IUser;
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.8rem;
`;

const UserMenuElement = styled.a<{ isActive?: boolean }>`
  color: ${COLORS.gray};
  cursor: pointer;
  font-weight: ${(props) => props.isActive && 'bold'};
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 0.8rem;
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

  @media (max-width: 576px) {
    font-size: 0.7rem;
  }
`;

const UserMenu = ({ user }: UserMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const location = { element: 'route_names' };
  const t = useTranslate();

  return (
    <MenuContainer>
      {user.userType === 'artist' ? (
        <>
          <UserMenuElement
            isActive={pathname === ROUTE_PATHS.EDIT_ARTIST_PROFILE}
            href={`${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${user.id}`}
          >
            {t('edit_artist_profile', location)}
          </UserMenuElement>
        </>
      ) : (
        <>
          <UserMenuElement
            isActive={pathname === ROUTE_PATHS.EDIT_ARTIST_ACCOUNTS}
            href={`${ROUTE_PATHS.EDIT_ARTIST_ACCOUNTS}`}
          >
            {t('edit_artist_accounts', location)}
          </UserMenuElement>
          <UserMenuElement
            isActive={pathname === ROUTE_PATHS.EDIT_EXHIBITIONS}
            href={`${ROUTE_PATHS.EDIT_EXHIBITIONS}`}
          >
            {t('edit_exhibitions', location)}
          </UserMenuElement>
          <UserMenuElement
            isActive={pathname === ROUTE_PATHS.EDIT_ARTWORKS}
            href={`${ROUTE_PATHS.EDIT_ARTWORKS}`}
          >
            {t('edit_artworks', location)}
          </UserMenuElement>
          <UserMenuElement
            isActive={pathname === ROUTE_PATHS.EDIT_ANNOUNCEMENTS}
            href={`${ROUTE_PATHS.EDIT_ANNOUNCEMENTS}`}
          >
            {t('edit_announcements', location)}
          </UserMenuElement>

          <UserMenuElement
            isActive={pathname === ROUTE_PATHS.REGISTER}
            href={`${ROUTE_PATHS.REGISTER}`}
          >
            {t('register', location)}
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
        {t('logout', location)}
      </UserMenuElement>
    </MenuContainer>
  );
};

export default UserMenu;
