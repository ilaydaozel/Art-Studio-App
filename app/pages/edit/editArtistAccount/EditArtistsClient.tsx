'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ROUTE_PATHS } from '@/constants/routes';
import EditArtistMenu from './EditArtistMenu';
import { IArtistProfile } from '@/app/actions/type';
import SlidingButton from '@/app/components/buttons/SlidingButton';
import useAddAnnouncementModal from '@/app/hooks/useAddAnnouncementModal';
import AddAnnouncementModal from '@/app/components/modal/AddAnnouncementModal';

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
interface EditArtistsClientProps {
  artists: IArtistProfile[];
}

const EditArtistsClient = ({ artists }: EditArtistsClientProps) => {
  const router = useRouter();
  const addAnnouncementModal = useAddAnnouncementModal();
  const handleEdit = (artist: IArtistProfile) => {
    router.push(
      `${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${artist?.artistId}`
    );
  };

  return (
    <div>
      <div className='p-[2vw] w-full'>
        <div className='flex w-full justify-end'>
          <AddAnnouncementModal />
          <SlidingButton
            label='Yeni Sanatçı Ekle +'
            onClick={() =>
              router.push(`${ROUTE_PATHS.ADD}${ROUTE_PATHS.ADD_NEW_ARTIST}`)
            }
          ></SlidingButton>
          <SlidingButton
            label='Yeni Duyuru Ekle +'
            onClick={() => addAnnouncementModal.onOpen()}
          ></SlidingButton>
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
