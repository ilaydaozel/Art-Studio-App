'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ArtistProfile } from '@prisma/client';
import { ROUTE_PATHS } from '@/constants/routes';
import EditArtistMenu from './EditArtistMenu';

const ArtistContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;
  width: 20%;
  cursor: pointer;
  gap: 4px;
`;

const ArtistName = styled.text`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.gray};
  &:hover {
    color: ${COLORS.darkGray};
    text-decoration: underline;
  }
`;

const ArtistsTitle = styled.text`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
`;

const AddArtistButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  transition: transform 0.5s;
  background-color: ${COLORS.darkGray};
  color: white;
  &:hover {
    transform: translateY(0.5rem);
  }
`;

interface EditArtistsClientProps {
  artists?: ArtistProfile[] | null;
}

const EditArtistsClient = ({ artists }: EditArtistsClientProps) => {
  console.log('artists: ', artists);
  const router = useRouter();

  const handleEdit = (artist: ArtistProfile) => {
    router.push(`${ROUTE_PATHS.EDIT_PROFILE}/${artist?.artistId}`);
  };

  return (
    <div>
      <div className='p-[2vw] w-full'>
        <div className='flex w-full justify-end'>
          <AddArtistButton onClick={() => router.push(ROUTE_PATHS.ADD_ARTIST)}>
            Yeni Sanatçı Ekle +
          </AddArtistButton>
        </div>

        <div className='w-full flex flex-col items-start ml-6 mt-10'>
          <ArtistsTitle>Sanatçıları Düzenle</ArtistsTitle>
          <div className='w-full flex flex-row flex-wrap'>
            {artists?.map((artist) => (
              <ArtistContainer key={artist.id}>
                <ArtistName onClick={() => handleEdit(artist)}>
                  {artist.user.name} {artist.user.surname}
                </ArtistName>
                <EditArtistMenu currentArtist={artist.user}></EditArtistMenu>
              </ArtistContainer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArtistsClient;
