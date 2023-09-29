'use client';
import { IUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import EditMenu from '../menu/EditMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ROUTE_PATHS } from '@/constants/routes';
import ArtistAccount from '../artist/ArtistAccount';

interface ArtistAccountsListProps {
  accounts: IUser[];
  width?: string;
  isEditable?: boolean;
}
const ArtworkContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin: 16px 4px;
`;

const ListContainer = styled.div<{ width: string }>`
  display: grid;
  grid-auto-rows: max-content;
  align-items: start;
  justify-items: center;
  width: ${(props) => props.width};
  margin: 2rem 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ArtistAccountsList = ({
  accounts,
  width = '100%',
  isEditable = false,
}: ArtistAccountsListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    router.refresh();
  };
  const handleDeleteArtistAccount = (accountId: string) => {
    setIsLoading(true);
    axios
      .delete(`/api/user/deleteUser/${accountId}`)
      .then(() => {
        toast.success('Sanatçı sistemden silindi!');
        refreshPage();
      })
      .catch(() => {
        toast.error('Bir şeyler yanlış gitti');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ListContainer width={width}>
      {accounts.map((account: IUser) => (
        <div key={account.id} className='flex flex-col items-end'>
          <ArtworkContainer>
            <ArtistAccount artist={account}></ArtistAccount>
            {isEditable ? (
              <EditMenu
                onEditClick={() => {
                  router.push(
                    `${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${account.id}`
                  );
                }}
                onDeleteClick={() => handleDeleteArtistAccount(account.id)}
              ></EditMenu>
            ) : (
              <></>
            )}
          </ArtworkContainer>
        </div>
      ))}
    </ListContainer>
  );
};
export default ArtistAccountsList;
