'use client';
import styled from 'styled-components';
import { ROUTE_PATHS } from '@/constants/routes';
import { IUser } from '@/app/types';
import { COLORS } from '@/constants/colors';
import Image from 'next/image';
interface ArtistAccountProps {
  artist: IUser;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 10px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-0.8rem);
  }
`;

const NameText = styled.div`
  font-size: 1rem;
  font-color: ${COLORS.gray};
  @media (max-width: 768px) {
    font-size: 1 rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ArtistImage = styled.div`
  position: relative;
  width: 13vw;
  height: 13vw;
  box-shadow: 0.6rem 0.6rem 1rem 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    width: 16vw;
    height: 16vw;
  }

  @media (max-width: 576px) {
    width: 30vw;
    height: 30vw;
  }
`;

const ArtistAccount = ({ artist }: ArtistAccountProps) => {
  const { artistProfile } = artist;
  return (
    <a href={`${ROUTE_PATHS.ARTIST_PROFILE}/${artist.id}`}>
      <Wrapper>
        <ArtistImage>
          <Image
            src={
              artistProfile?.profilePic
                ? artistProfile.profilePic
                : '/images/blurImage.jpg'
            }
            alt='Artist account preview'
            fill
            quality={70}
            placeholder='blur'
            blurDataURL={'/images/blurImage.jpg'}
            className='object-cover'
          />
        </ArtistImage>
        <NameText>
          {artist.name} {artist.surname}
        </NameText>
      </Wrapper>
    </a>
  );
};

export default ArtistAccount;
