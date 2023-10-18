'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IExhibition } from '@/app/types';
import { COLORS } from '@/constants/colors';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import useUpdateTextModal from '@/app/hooks/useUpdateTextModal';
import axios from 'axios';
import UpdateTextModal from '../modal/UpdateTextModal';
import EditButton from '../buttons/EditButton';

interface AboutProps {
  exhibition: IExhibition;
  isEditable?: boolean;
}

const DescriptionText = styled.div`
  width: 100%;
  font-size: 0.9rem;
  color: ${COLORS.darkGray};
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const About = ({ exhibition, isEditable = false }: AboutProps) => {
  const t = useTranslate();
  const updateTextModal = useUpdateTextModal();
  const location = {
    element: 'description',
    superElement: 'exhibition_profile',
  };
  const updateDescription = async (newText: string) => {
    return await axios.post(
      `/api/exhibition/updateExhibition/${exhibition.id}`,
      {
        description: newText,
      }
    );
  };

  return (
    <ComponentWithHeading headingText={t('heading', location)}>
      <UpdateTextModal
        script={exhibition.description || ''}
        label={t('edit_button_label', location)}
        onClose={updateTextModal.onClose}
        onSubmit={updateDescription}
      />
      <div className='w-[84%] relative flex flex-col justify-end items-end'>
        <DescriptionText>{exhibition.description}</DescriptionText>
        {isEditable && (
          <div className=''>
            <EditButton onClick={updateTextModal.onOpen}></EditButton>
          </div>
        )}
      </div>
    </ComponentWithHeading>
  );
};

export default About;
