import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import ArtistPreview from '../../components/artist/ArtistAccount';
import { IUser } from '@/app/types';
import getAllArtists from '../../actions/getAllArtists';
import ArtistAccountsList from '../../components/lists/ArtistAccountsList';
import ComponentWithHeading from '../../components/layouts/ComponentWithHeading';
import { getDictionary } from '@/lib/dictionary';

const ArtistsPage = async () => {
  const { artistsPage } = await getDictionary('en');
  let artists: IUser[] | null = null;
  try {
    const result = await getAllArtists();
    if (result && result.artists) {
      artists = result.artists;
      if (artists.length > 0) {
        return (
          <ClientOnly>
            <div className='md:pt-24 pt-16 w-full'>
              <ComponentWithHeading headingText={artistsPage.list_heading}>
                <ArtistAccountsList
                  width='90%'
                  accounts={artists}
                ></ArtistAccountsList>
              </ComponentWithHeading>
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

export default ArtistsPage;
