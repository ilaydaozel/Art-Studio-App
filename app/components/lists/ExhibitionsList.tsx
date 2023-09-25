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
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 5rem 0;
  width: ${(props) => props.width};
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
