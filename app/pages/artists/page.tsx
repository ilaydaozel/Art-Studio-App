import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import getAllArtistProfiles from '@/app/actions/getAllArtistProfiles';
import ArtistPreviewClient from './ArtistPreviewClient';
import { IArtistProfile } from '@/app/actions/type';

const ArtistsPage = async () => {
  let artistProfiles: IArtistProfile[] = [];

  try {
    const result = await getAllArtistProfiles();
    if (result && result.artistProfiles) {
      artistProfiles = result.artistProfiles;
      if (artistProfiles.length > 0) {
        return (
          <ClientOnly>
            <div className='md:pt-24 pt-16 w-full'>
              <div className='flex flex-wrap justify-start gap-4 md:px-12 md:my-8 px-6 my-4'>
                {artistProfiles?.map((artist) => (
                  <ArtistPreviewClient
                    key={artist.id}
                    artist={artist}
                  ></ArtistPreviewClient>
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
