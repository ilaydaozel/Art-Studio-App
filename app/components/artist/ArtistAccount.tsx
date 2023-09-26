'use client';
import styled from 'styled-components';
import { ROUTE_PATHS } from '@/constants/routes';
import { IUser } from '@/app/types';

interface ArtistAccountProps {
  artist: IUser;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 10px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-0.8rem);
  }
`;

const NameText = styled.div`
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 1 rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ArtistImage = styled.div<{ profilePic: string }>`
  width: 13vw;
  height: 13vw;
  background-image: url(${(props) => props.profilePic});
  background-size: cover;
  overflow: hidden;

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
        <ArtistImage
          profilePic={artistProfile?.profilePic ? artistProfile.profilePic : ''}
        />
        <NameText>
          {artist.name} {artist.surname}
        </NameText>
      </Wrapper>
    </a>
  );
};

export default ArtistAccount;
