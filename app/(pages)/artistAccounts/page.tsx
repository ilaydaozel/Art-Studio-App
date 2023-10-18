import ClientOnly from '@/app/components/ClientOnly';
import { IUser } from '@/app/types';
import getAllArtists from '@/app/actions/user/getAllArtists';
import ArtistAccountsClient from './ArtistAccountsClient';

const ArtistAccountsPage = async () => {
  let artists: IUser[] | null = null;
  try {
    const result = await getAllArtists();
    if (result.artists) {
      artists = result.artists;

      return (
        <ClientOnly>
          <div className='pt-28 w-full'>
            <ArtistAccountsClient accounts={artists}></ArtistAccountsClient>
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default ArtistAccountsPage;
