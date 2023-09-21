import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import { IUser } from '@/app/types';
import ArtistAccountsList from './EditArtistAccountsClient';
import getAllArtists from '@/app/actions/user/getAllArtists';

const EditArtistsPage = async () => {
  let artists: IUser[] | null = null;
  try {
    const result = await getAllArtists();
    if (result && result.artists) {
      artists = result.artists;
      if (artists.length > 0) {
        return (
          <ClientOnly>
            <div className='pt-28 w-full'>
              <ArtistAccountsList accounts={artists}></ArtistAccountsList>
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
