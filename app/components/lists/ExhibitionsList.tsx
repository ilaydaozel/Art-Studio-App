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
import useTranslate from '@/app/hooks/useTranslate';
import { handleApiResponse } from '../utils/Helper';

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
  const t = useTranslate();
  const location = { element: 'exhibitions' };

  const handleDeleteExhibition = async (exhibitionId: string) => {
    await handleApiResponse(
      axios.delete(`/api/exhibition/deleteExhibition/${exhibitionId}`),
      setIsLoading,
      t,
      router,
      t('delete_successful_message', location)
    );
  };

  return (
    <ListContainer width={width}>
      {exhibitions.map((exhibition: IExhibition) => (
        <div key={exhibition.id} className='flex flex-col items-end'>
          <ExhibitionContainer>
            <Exhibition exhibition={exhibition}></Exhibition>
            {isEditable && (
              <EditMenu
                onDeleteClick={() => handleDeleteExhibition(exhibition.id)}
                onEditClick={() => {
                  router.push(
                    `${ROUTE_PATHS.EDIT_EXHIBITION}/${exhibition.id}`
                  );
                }}
              ></EditMenu>
            )}
          </ExhibitionContainer>
        </div>
      ))}
    </ListContainer>
  );
};
export default ExhibitionsList;
