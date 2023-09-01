import getAllArtworksByArtistId from '@/app/actions/getAllArtworksByArtistId';
import ExhibitionMenu from './ExhibitionMenu';

const VirtualExhibition = async () => {
  const allArtworks = await getAllArtworksByArtistId({
    artistId: '64e8789844c6db1554c51d1f',
  });
  return (
    <>
      <div className='flex items-center justify-center mt-28'>
        <ExhibitionMenu
          artworks={allArtworks?.allUserArtworks}
        ></ExhibitionMenu>
      </div>
    </>
  );
};

export default VirtualExhibition;
