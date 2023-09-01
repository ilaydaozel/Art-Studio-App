import getAllArtworksByArtistId from '@/app/actions/getAllArtworksByArtistId';
import ExhibitionPreview from './ExhibitionPreview';

const VirtualExhibition = async () => {
  const allArtworks = await getAllArtworksByArtistId({
    artistId: '64e8789844c6db1554c51d1f',
  });
  return (
    <>
      <div className='flex items-center justify-center mt-28'>
        <ExhibitionPreview
          artworks={allArtworks?.allUserArtworks}
        ></ExhibitionPreview>
      </div>
    </>
  );
};

export default VirtualExhibition;
