'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile } from '../../types';
import useUpdateTextModal from '../../hooks/useUpdateTextModal';
import EditButton from '../buttons/EditButton';
import UpdateTextModal from '../modal/UpdateTextModal';
import axios from 'axios';
import useTranslate from '@/app/hooks/useTranslate';

interface BiographyProps {
  artistProfile: IArtistProfile;
  isEditable?: boolean;
}

const BiographyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const BiographyContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
  word-break: break-all;
  padding: 10px 0;
  @media (max-width: 992px) {
    font-size: 0.8rem;
  }
`;

const Biography = ({ artistProfile, isEditable = false }: BiographyProps) => {
  const updateTextModal = useUpdateTextModal();
  const t = useTranslate();
  const location = { element: 'biography', superElement: 'artist_profile' };
  const updateBiography = async (newText: string) => {
    return await axios.post(`/api/artistProfile/${artistProfile?.artistId}`, {
      biography: newText,
    });
  };

  return (
    <>
      <UpdateTextModal
        script={artistProfile.biography || ''}
        label={t('biography_label', location)}
        onClose={updateTextModal.onClose}
        onSubmit={updateBiography}
      />
      <BiographyContainer>
        <BiographyContent>{artistProfile?.biography}</BiographyContent>
        {isEditable && (
          <EditButton
            label={t('edit_button_label', location)}
            onClick={updateTextModal.onOpen}
          ></EditButton>
        )}
      </BiographyContainer>
    </>
  );
};

export default Biography;
