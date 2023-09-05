import ClientOnly from '@/app/[lang]/components/ClientOnly';
import EmptyState from '@/app/[lang]/components/EmptyState';

import getArtistProfileById from '@/app/[lang]/actions/getArtistProfileById';
import ArtistProfile from './ArtistProfile';
import getAllArtworksByArtistId from '@/app/[lang]/actions/getAllArtworksByArtistId';
import { IArtistProfile, IUserArtwork } from '@/app/[lang]/actions/type';

interface IParams {
  artistId?: string;
}

const ArtistProfilePage = async ({ params }: { params: IParams }) => {
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
        profileInfo={artistProfile.artistProfile}
        artworks={allArtworks?.allUserArtworks}
      />
    </ClientOnly>
  );
};

export default ArtistProfilePage;
