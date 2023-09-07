import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import ArtistPreview from '../../components/artist/ArtistAccount';
import { IUser } from '@/app/[lang]/types';
import getAllArtists from '../../actions/getAllArtists';
import ArtistAccountsList from '../../components/lists/ArtistAccountsList';
import ComponentWithHeading from '../../components/layouts/ComponentWithHeading';
import { getDictionary } from '@/lib/dictionary';
import { IPageProps } from '../../types/common';

const ArtistsPage = async ({ params }: { params: IPageProps }) => {
  const { artistsPage } = await getDictionary(params.lang);
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
