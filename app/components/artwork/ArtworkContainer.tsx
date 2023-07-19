'use client';
import { UserArtwork } from '@prisma/client';
import styled from 'styled-components';
import Image from 'next/image';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { COLORS } from '@/constants/colors';

interface ArtworkContainerProps {
  artwork?: UserArtwork | null;
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

const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 320px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
`;
const InfoContent = styled.p``;

const ArtworkContainer = ({ artwork }: ArtworkContainerProps) => {
  return (
    <Container>
      <PhotoContainer>
        {artwork?.artworkMedias[0] !== undefined ? (
          <Image
            src={artwork?.artworkMedias[0] || ''}
            alt={'artwork image'}
            objectFit='cover' /* Set object-fit to 'cover' to make the image fit 320x320 size */
            layout='fixed'
            width={320}
            height={320}
          />
        ) : (
          <div>
            <MdOutlinePhotoSizeSelectActual
              style={{ color: `${COLORS.gray}`, fontSize: '5em' }}
            />
          </div>
        )}
      </PhotoContainer>
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
  );
};

export default ArtworkContainer;
