import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import getAllArtistProfiles from '@/app/actions/getAllArtistProfiles';
import EditArtistsClient from './EditArtistsClient';
import { IArtistProfile } from '@/app/actions/type';

const EditArtistsPage = async () => {
  let artistProfiles: IArtistProfile[] | null = null;
  try {
    const result = await getAllArtistProfiles();
    if (result && result.artistProfiles) {
      artistProfiles = result.artistProfiles;
      if (artistProfiles.length > 0) {
        return (
          <ClientOnly>
            <div className='pt-24 w-full'>
              <EditArtistsClient artists={artistProfiles}></EditArtistsClient>
            </div>
          </ClientOnly>
        );
      } else {
        return (
          <ClientOnly>
            <EmptyState
              title='No artists found'
              subtitle='Looks like you have no artists.'
            />
          </ClientOnly>
        );
      }
    } else {
      return (
        <ClientOnly>
          <EmptyState
            title='An error occured.'
            subtitle='Looks like you have no artists.'
          />
        </ClientOnly>
      );
    }
  } catch (error) {
    return (
      <ClientOnly>
        <EmptyState
          title='An error occured.'
          subtitle='Looks like you have no artists.'
        />
      </ClientOnly>
    );
  }
};

export default EditArtistsPage;
