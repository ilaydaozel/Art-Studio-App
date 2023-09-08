import getAllArtworksByArtistId from '@/app/actions/getAllArtworksByArtistId';
import Exhibition from '../../components/exhibition/Exhibition';

const VirtualExhibition = async () => {
  const allArtworks = await getAllArtworksByArtistId({
    artistId: '64e8789844c6db1554c51d1f',
  });
  return (
    <>
      <div className='flex flex-col mt-28'>
        <div className='flex flex-wrap justify-around gap-4 md:px-12 md:my-8 px-6 my-4'>
          <Exhibition artworks={allArtworks?.allUserArtworks}></Exhibition>
        </div>
      </div>
    </>
  );
};

export default VirtualExhibition;
