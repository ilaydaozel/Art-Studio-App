import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

import getArtistProfileById from '@/app/actions/getArtistProfileById';
import ArtistProfile from '@/app/components/artistProfile/ArtistProfile';
import getAllArtworksByArtistId from '@/app/actions/getAllArtworksByArtistId';
import { IArtistProfile, IUserArtwork } from '@/app/types';
import { getDictionary } from '@/lib/dictionary';

interface IParams {
  artistId?: string;
}

const ArtistProfilePage = async ({ params }: { params: IParams }) => {
  const { artistProfilePage } = await getDictionary('en');
  let artistProfile: { artistProfile: IArtistProfile } | null = null;
  let allArtworks: { allUserArtworks: IUserArtwork[] } | null = null;

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
        messages={artistProfilePage}
        artistProfile={artistProfile.artistProfile}
        artworks={allArtworks?.allUserArtworks}
      />
    </ClientOnly>
  );
};

export default ArtistProfilePage;
