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
  let allArtworks = null;
  if (params != undefined && params != undefined) {
    artistProfile = await getArtistProfileById(params);
    allArtworks = await getAllArtworksByArtistId(params);
  }
  console.log('artistProfile: ', artistProfile);
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
      <div className='pt-20'>
        <ArtistPage
          profileInfo={artistProfile?.artistProfile}
          artworks={allArtworks?.allUserArtworks}
        />
      </div>
    </ClientOnly>
  );
};

export default ArtistProfilePage;
