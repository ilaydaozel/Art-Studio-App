import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import getAllArtistProfiles from '@/app/actions/getAllArtistProfiles';
import ArtistPreview from './ArtistPreview';
import { IArtistProfile } from '@/app/actions/type';
import { useRouter } from 'next/navigation';
import { ROUTE_PATHS } from '@/constants/routes';

const ArtistsPage = async () => {
  let artistProfiles: IArtistProfile[] = [];

  try {
    const result = await getAllArtistProfiles();
    if (result && result.artistProfiles) {
      artistProfiles = result.artistProfiles;
      console.log('artistProfiles: ', artistProfiles);
      if (artistProfiles.length > 0) {
        return (
          <ClientOnly>
            <div className='pt-24  w-full'>
              <div className='flex flex-wrap gap-4 px-12 my-8'>
                {artistProfiles?.map((artist) => (
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
