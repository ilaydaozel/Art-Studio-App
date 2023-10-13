'use client';

import { useRouter } from 'next/navigation';
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
  gap: 10px;
  font-size: 0.8rem;
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

const UserMenu = ({ user }: UserMenuProps) => {
  const router = useRouter();

  const location = { element: 'route_names' };
  const t = useTranslate();

  return (
    <MenuContainer>
      <NameText>
        {user.name} {user.surname}
      </NameText>
      {user.userType === 'artist' ? (
        <>
          <UserMenuElement
            href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${user.id}`}
          >
            {t('edit_artist_profile', location)}
          </UserMenuElement>
        </>
      ) : (
        <>
          <UserMenuElement
            href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_ACCOUNTS}`}
          >
            {t('edit_artist_accounts', location)}
          </UserMenuElement>
          <UserMenuElement
            href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ANNOUNCEMENTS}`}
          >
            {t('edit_announcements', location)}
          </UserMenuElement>
          <UserMenuElement
            href={`${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_EXHIBITIONS}`}
          >
            {t('edit_exhibitions', location)}
          </UserMenuElement>
          <UserMenuElement href={`${ROUTE_PATHS.REGISTER}`}>
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
