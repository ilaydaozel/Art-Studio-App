import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getArtistProfileById from '@/app/actions/artistProfile/getArtistProfileById';
import ArtistProfile from '@/app/components/artistProfile/ArtistProfile';
import getAllArtworksByArtistId from '@/app/actions/artwork/getAllArtworksByArtistId';
import { IArtistProfile, IArtwork } from '@/app/types';
import Link from 'next/link';
import Artwork from '@/app/components/artwork/Artwork';

interface IParams {
  artistId?: string;
}

const ArtistProfilePage = async ({ params }: { params: IParams }) => {
  let artistProfile: { artistProfile: IArtistProfile } | null = null;
  let allArtworks: { allArtworks: IArtwork[] } | null = null;

  if (params != undefined && params != undefined) {
    artistProfile = await getArtistProfileById(params);
    allArtworks = await getAllArtworksByArtistId(params);
  }

  if (!artistProfile) {
    return (
      <ClientOnly>
        <EmptyState
          title='An error occured.'
          subtitle='Looks like this artist does not exist anymore.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ArtistProfile
        artistProfile={artistProfile.artistProfile}
        artworks={allArtworks?.allArtworks}
      />
    </ClientOnly>
  );
};

export default ArtistProfilePage;
