'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile } from '../../actions/type';
import useBiographyModal from '../../hooks/useBiographyModal';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import BiographyModal from '../modal/BiographyModal';
import { useRouter } from 'next/navigation';

const BiographyContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
  word-break: break-all;
  padding: 10px 0;
`;

const InformaionContainer = styled.div`
  width: full;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface BiographyProps {
  artistProfile: IArtistProfile;
  isEditable: boolean;
}

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
    </>
  );
};

export default Biography;