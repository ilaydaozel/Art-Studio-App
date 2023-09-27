import getArtistProfileById from '@/app/actions/artistProfile/getArtistProfileById';
import ClientOnly from '@/app/components/ClientOnly';
import ArtistProfile from '@/app/components/artistProfile/ArtistProfile';
import EmptyState from '@/app/components/EmptyState';
import getAllArtworksByArtistId from '@/app/actions/artwork/getAllArtworksByArtistId';
import { IArtistProfile, IArtwork } from '@/app/types';
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
        artistProfile={artistProfile.artistProfile}
        artworks={allArtworks?.allArtworks}
        isEditable={true}
      />
    </ClientOnly>
  );
};

export default ArtistProfilePage;
