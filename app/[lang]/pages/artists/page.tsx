import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import ArtistPreview from './ArtistPreview';
import { IUser } from '@/app/[lang]/actions/type';
import getAllArtists from '../../actions/getAllArtists';

const ArtistsPage = async () => {
  let artists: IUser[] | null = null;
  try {
    const result = await getAllArtists();
    if (result && result.artists) {
      artists = result.artists;
      if (artists.length > 0) {
        return (
          <ClientOnly>
            <div className='md:pt-24 pt-16 w-full'>
              <div className='flex flex-wrap justify-around gap-4 md:px-12 md:my-8 px-6 my-4'>
                {artists?.map((artist) => (
                  <ArtistPreview
                    key={artist.id}
                    artist={artist}
                  ></ArtistPreview>
                ))}
              </div>
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
