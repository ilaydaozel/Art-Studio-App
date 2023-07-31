import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import getAllArtistProfiles from '@/app/actions/getAllArtistProfiles';
import EditArtistsClient from './EditArtistsClient';

const EditArtistsPage = async () => {
  const artists = await getAllArtistProfiles();
  const artistsArray = artists?.artistProfile;

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
      <div className='pt-20  w-full'>
        <h1 className='text-4xl my-10 mx-6'>Sanatçılar</h1>
        <div className='flex flex-wrap gap-4 mx-6 my-10'>
          <EditArtistsClient artists={artistsArray}></EditArtistsClient>
        </div>
      </div>
    </ClientOnly>
  );
};

export default EditArtistsPage;
