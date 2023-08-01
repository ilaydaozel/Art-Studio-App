import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import getAllArtistProfiles from '@/app/actions/getAllArtistProfiles';
import ArtistPreview from './ArtistPreview';

const ArtistsPage = async () => {
  const artists = await getAllArtistProfiles();
  const artistsArray = artists?.artistProfile;
  console.log('artists : ', artists);
  console.log('artistsArray: ', artistsArray);

  if (artistsArray?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No artists found'
          subtitle='Looks like you have no artists.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className='pt-24  w-full'>
        <h1 className='text-3xl my-10 mx-10'>Sanatçılar</h1>
        <div className='flex flex-wrap gap-4 px-12 my-8'>
          {artistsArray?.map((artist) => (
            <ArtistPreview artist={artist}></ArtistPreview>
          ))}
        </div>
      </div>
    </ClientOnly>
  );
};

export default ArtistsPage;
