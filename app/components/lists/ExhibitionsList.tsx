'use client';
import { IExhibition } from '@/app/types';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import EditMenu from '../menu/EditMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ROUTE_PATHS } from '@/constants/routes';
import Exhibition from '../exhibition/ExhibitionPreview';

interface ExhibitionsListProps {
  exhibitions: IExhibition[];
  width?: string;
  isEditable?: boolean;
}

const ExhibitionContainer = styled.div`
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
  grid-template-columns: 1fr;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ExhibitionsList = ({
  exhibitions,
  width = '100%',
  isEditable = false,
}: ExhibitionsListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    router.refresh();
  };
  const handleDeleteExhibition = (exhibitionId: string) => {
    setIsLoading(true);
    axios
      .delete(`/api/user/${exhibitionId}`)
      .then(() => {
        toast.success('Sergi sistemden silindi!');
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
      {exhibitions.map((exhibition: IExhibition) => (
        <div key={exhibition.id} className='flex flex-col items-end'>
          <ExhibitionContainer>
            <Exhibition exhibition={exhibition}></Exhibition>
            {isEditable ? (
              <EditMenu
                onEditClick={() => {
                  router.push(
                    `${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${exhibition.id}`
                  );
                }}
                onDeleteClick={() => handleDeleteExhibition(exhibition.id)}
              ></EditMenu>
            ) : (
              <></>
            )}
          </ExhibitionContainer>
        </div>
      ))}
    </ListContainer>
  );
};
export default ExhibitionsList;
