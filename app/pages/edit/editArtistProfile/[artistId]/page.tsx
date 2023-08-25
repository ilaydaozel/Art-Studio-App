import getArtistProfileById from '@/app/actions/getArtistProfileById';
import ClientOnly from '@/app/components/ClientOnly';
import ArtistProfile from './ArtistProfile';
import EmptyState from '@/app/components/EmptyState';
import getAllArtworksByArtistId from '@/app/actions/getAllArtworksByArtistId';
import { IArtistProfile, IUserArtwork } from '@/app/actions/type';

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

  if (!artistProfile?.artistProfile) {
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
