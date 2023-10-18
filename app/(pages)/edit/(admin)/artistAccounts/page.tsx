import ClientOnly from '@/app/components/ClientOnly';
import { IUser } from '@/app/types';
import getAllArtists from '@/app/actions/user/getAllArtists';
import EditArtistAccountsClient from './EditArtistAccountsClient';

const EditArtistAccountsPage = async () => {
  let artists: IUser[] | null = null;
  try {
    const result = await getAllArtists();
    if (result.artists) {
      artists = result.artists;

      return (
        <ClientOnly>
          <div className='pt-28 w-full'>
            <EditArtistAccountsClient
              accounts={artists}
            ></EditArtistAccountsClient>
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default EditArtistAccountsPage;
