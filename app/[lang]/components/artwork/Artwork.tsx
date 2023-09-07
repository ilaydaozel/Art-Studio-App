'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { COLORS } from '@/constants/colors';
import useArtworkModal from '@/app/[lang]/hooks/useArtworkModal';
import ArtworkModal from '../modal/ArtworkModal';
import { IUserArtwork } from '@/app/[lang]/types';

interface ArtworkProps {
  artwork: IUserArtwork | null;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  max-width: 320px;
  background-color: #fff;
  gap: 3rem;
`;
const ArtworkContainer = styled.div`
  width: 280px;
  height: 280px;
  position: relative;
  box-shadow: 1.25rem 1.375rem 4.75rem 0 rgba(0, 0, 0, 0.42);
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
`;
const InfoContent = styled.p`
  font-size: 12px;
  color: ${COLORS.darkGray};
`;

const Artwork = ({ artwork }: ArtworkProps) => {
  const detailedArtworkModal = useArtworkModal();
  return (
    <div>
      <ArtworkModal
        artwork={artwork}
        onClose={detailedArtworkModal.onClose}
      ></ArtworkModal>
      <Container onClick={detailedArtworkModal.onOpen}>
        {artwork?.artworkMedias[0] !== undefined ? (
          <ArtworkContainer>
            <Image
              src={artwork?.artworkMedias[0] || ''}
              placeholder='empty'
              alt='artwork'
              fill
              className='object-cover'
            />
          </ArtworkContainer>
        ) : (
          <div>
            <MdOutlinePhotoSizeSelectActual
              style={{ color: `${COLORS.gray}`, fontSize: '5em' }}
            />
          </div>
        )}
        <InfoContainer>
          <InfoContent>{artwork?.title || ''}</InfoContent>
          <InfoContent>{artwork?.description || ''}</InfoContent>
          <InfoContent>{artwork?.creationYear || ''}</InfoContent>
          <InfoContent>{artwork?.medium || ''}</InfoContent>
          <InfoContent>{artwork?.type || ''}</InfoContent>
          <InfoContent>
            {artwork?.width || ''} x {artwork?.height || ''}
          </InfoContent>
        </InfoContainer>
      </Container>
    </div>
  );
};

export default Artwork;
