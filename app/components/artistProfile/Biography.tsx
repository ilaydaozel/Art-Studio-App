'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile } from '../../types';
import useBiographyModal from '../../hooks/useBiographyModal';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import BiographyModal from '../modal/BiographyModal';
import { useRouter } from 'next/navigation';

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
`;

const Biography = ({ artistProfile, isEditable = false }: BiographyProps) => {
  const biographyModal = useBiographyModal();
  const router = useRouter();
  const refreshPage = () => {
    router.refresh();
  };

  return (
    <>
      <BiographyModal
        artistProfile={artistProfile}
        onClose={biographyModal.onClose}
        onUpdate={refreshPage}
      />
      <BiographyContainer>
        <BiographyContent>{artistProfile?.biography}</BiographyContent>
        {isEditable ? (
          <TextButton
            label='Düzenle'
            icon={FaRegEdit}
            onClick={biographyModal.onOpen}
          ></TextButton>
        ) : (
          <></>
        )}
      </BiographyContainer>
    </>
  );
};

export default Biography;
