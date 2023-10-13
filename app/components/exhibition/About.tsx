'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IExhibition } from '@/app/types';
import { COLORS } from '@/constants/colors';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import useUpdateTextModal from '@/app/hooks/useUpdateTextModal';
import axios from 'axios';
import UpdateTextModal from '../modal/UpdateTextModal';
import TextButton from '../buttons/TextButton';
import { FaRegEdit } from 'react-icons/fa';

interface AboutProps {
  exhibition: IExhibition;
  isEditable?: boolean;
}

const DescriptionText = styled.div`
  font-size: 1rem;
  color: ${COLORS.darkGray};
`;

const About = ({ exhibition, isEditable = false }: AboutProps) => {
  const location = {
    element: 'description',
    superElement: 'exhibition_profile',
  };
  const t = useTranslate();
  const updateTextModal = useUpdateTextModal();
  const updateDescription = async (newText: string) => {
    return await axios.post(`/api/exhibition/${exhibition.id}`, {
      biography: newText,
    });
  };

  return (
    <ComponentWithHeading headingText={t('heading', location)}>
      <UpdateTextModal
        script={exhibition.description || ''}
        label={t('edit_button_label', location)}
        onClose={updateTextModal.onClose}
        onSubmit={updateDescription}
      />
      <div className='w-[84%] text-left'>
        <DescriptionText>{exhibition.description}</DescriptionText>
        {isEditable && (
          <TextButton
            label={t('edit_button_label', location)}
            icon={FaRegEdit}
            onClick={updateTextModal.onOpen}
          ></TextButton>
        )}
      </div>
    </ComponentWithHeading>
  );
};

export default About;
