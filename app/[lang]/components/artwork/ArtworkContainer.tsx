'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { COLORS } from '@/constants/colors';
import useArtworkModal from '@/app/[lang]/hooks/useArtworkModal';
import ArtworkModal from '../modal/ArtworkModal';
import { IUserArtwork } from '@/app/[lang]/actions/type';

interface ArtworkContainerProps {
  artwork: IUserArtwork | null;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 4px;
  width: 100%;
  max-width: 320px;
  background-color: #fff;
  gap: 10px;
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

const ArtworkContainer = ({ artwork }: ArtworkContainerProps) => {
  const detailedArtworkModal = useArtworkModal();
  return (
    <div>
      <ArtworkModal
        artwork={artwork}
        onClose={detailedArtworkModal.onClose}
      ></ArtworkModal>
      <Container onClick={detailedArtworkModal.onOpen}>
        {artwork?.artworkMedias[0] !== undefined ? (
          <div className='relative w-[280px] h-[280px]'>
            <Image
              src={artwork?.artworkMedias[0] || ''}
              placeholder='empty'
              alt='artwork'
              fill
              className='object-cover'
            />
          </div>
        ) : (
          <div>
            <MdOutlinePhotoSizeSelectActual
              style={{ color: `${COLORS.gray}`, fontSize: '5em' }}
            />
          </div>
        )}
        <InfoContainer>
          <InfoContent>{artwork?.title || ''}</InfoContent>
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

export default ArtworkContainer;
