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
      <div className='pt-24  w-full'>
        <EditArtistsClient artists={artistsArray}></EditArtistsClient>
      </div>
    </ClientOnly>
  );
};

export default EditArtistsPage;
