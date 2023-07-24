import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

import getArtistProfileById from '@/app/actions/getArtistProfileById';
import ArtistProfileClient from './ArtistProfileClient';
import getAllArtworksByArtistId from '@/app/actions/getAllArtworksByArtistId';

interface IParams {
  artistId?: string;
}

const ArtistProfilePage = async ({ params }: { params: IParams }) => {
  let artistProfile = null;
  let allArtworks = null;
  if (params != undefined && params != undefined) {
    artistProfile = await getArtistProfileById(params);
    allArtworks = await getAllArtworksByArtistId(params);
  }

  if (!artistProfile) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ArtistProfileClient
        profileInfo={artistProfile?.artistProfile}
        artworks={allArtworks?.allUserArtworks}
      />
    </ClientOnly>
  );
};

export default ArtistProfilePage;
