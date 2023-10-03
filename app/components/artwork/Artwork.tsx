'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { IArtwork } from '@/app/types';
import { ROUTE_PATHS } from '@/constants/routes';
import Link from 'next/link';

interface ArtworkProps {
  artwork: IArtwork;
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
  box-shadow: 1rem 1rem 3rem 0 rgba(0, 0, 0, 0.3);
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.9rem;
  color: ${COLORS.darkGray};
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const ArtistName = styled.p<{ isLink: boolean }>`
  font-weight: bold;
  ${(props) =>
    props.isLink &&
    `
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.8px;
      background-color: ${COLORS.darkGray};
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }
    &:hover::before {
      transform: translateX(0);
    }
  `}
`;
const Title = styled.p`
  font-style: italic;
`;
const Info = styled.p`
  font-style: normal;
`;

const Artwork = ({ artwork }: ArtworkProps) => {
  return (
    <div>
      <Container>
        <ArtworkContainer>
          <Image
            src={artwork.artworkMedias[0] || ''}
            alt='artwork'
            fill
            quality={100}
            placeholder='blur'
            blurDataURL={artwork.artworkMedias[0] || ''}
            className='object-cover'
          />
        </ArtworkContainer>

        <InfoContainer>
          {artwork.artistId ? (
            <Link href={`${ROUTE_PATHS.ARTIST_PROFILE}/${artwork.artistId}`}>
              <ArtistName isLink={true}>
                {artwork.artistName} {artwork.artistSurname}
              </ArtistName>
            </Link>
          ) : (
            <ArtistName isLink={false}>
              {artwork.artistName} {artwork.artistSurname}
            </ArtistName>
          )}
          <Title>{artwork.title}</Title>
          <Info>{artwork.description || ''}</Info>
          <Info>{artwork.creationYear || ''}</Info>
          <Info>{artwork.medium || ''}</Info>
          <Info>{artwork.type || ''}</Info>
          <Info>
            {artwork.width} x {artwork.height}
          </Info>
        </InfoContainer>
      </Container>
    </div>
  );
};

export default Artwork;
