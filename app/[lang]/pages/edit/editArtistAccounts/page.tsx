import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import { IUser } from '@/app/[lang]/types';
import ArtistAccountsList from './EditArtistAccountsClient';
import getAllArtists from '@/app/[lang]/actions/getAllArtists';
import { IPageProps } from '@/app/[lang]/types/page';
import { getDictionary } from '@/lib/dictionary';

const EditArtistsPage = async ({ params }: { params: IPageProps }) => {
  const { editArtistAccountsPage } = await getDictionary(params.lang);
  let artists: IUser[] | null = null;
  try {
    const result = await getAllArtists();
    if (result && result.artists) {
      artists = result.artists;
      if (artists.length > 0) {
        return (
          <ClientOnly>
            <div className='pt-28 w-full'>
              <ArtistAccountsList
                messages={editArtistAccountsPage}
                accounts={artists}
              ></ArtistAccountsList>
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
