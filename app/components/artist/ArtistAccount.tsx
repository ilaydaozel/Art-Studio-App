'use client';
import styled from 'styled-components';
import { ROUTE_PATHS } from '@/constants/routes';
import { IUser } from '@/app/types';

interface ArtistAccountProps {
  artist: IUser;
}

const NameText = styled.div`
  color: #fff;
  transition: color 0.2s;
  position: absolute;
  bottom: 2px;
`;

const ArtistBox = styled.div<{ profilePic: string }>`
  display: flex;
  justify-content: center;
  width: 15vw;
  height: 15vw;
  background-image: url(${(props) => props.profilePic});
  background-size: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
  position: relative;
  font-size: 1.5rem;
  transition: font-size 0.2s background-color:0.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s;
  }

  &:hover::before {
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:hover {
    font-size: 1.7rem;
  }

  @media (max-width: 768px) {
    width: 30vw;
    height: 30vw;
    font-size: 1.2 rem;
    &:hover {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    width: 40vw;
    height: 40vw;
    font-size: 1rem;
    &:hover {
      font-size: 1.2rem;
    }
  }
`;

const ArtistAccount = ({ artist }: ArtistAccountProps) => {
  const { artistProfile } = artist;
  return (
    <a href={`${ROUTE_PATHS.ARTIST_PROFILE}/${artist.id}`}>
      <ArtistBox
        profilePic={artistProfile?.profilePic ? artistProfile.profilePic : ''}
      >
        <NameText>
          {artist.name} {artist.surname}
        </NameText>
      </ArtistBox>
    </a>
  );
};

export default ArtistAccount;
