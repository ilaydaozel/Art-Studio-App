import getArtistProfileById from '@/app/actions/getArtistProfileById';
import ClientOnly from '@/app/components/ClientOnly';
import ArtistPage from './ArtistPage';
import EmptyState from '@/app/components/EmptyState';
import getAllArtworksByArtistId from '@/app/actions/getAllArtworksByArtistId';

interface IParams {
  artistId?: string;
}

const ArtistProfilePage = async ({ params }: { params: IParams }) => {
  let artistProfile = null;
  if (params != undefined && params != undefined) {
    artistProfile = await getArtistProfileById(params);
  }
  console.log('artistProfile: ', artistProfile);
  const allArtworks = getAllArtworksByArtistId(params);
  console.log('allArtworks ', allArtworks);
  if (!artistProfile) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ArtistPage profileInfo={artistProfile?.artistProfile} />
    </ClientOnly>
  );
};

export default ArtistProfilePage;
