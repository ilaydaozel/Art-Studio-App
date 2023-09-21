import Modal from '../../../Modal';

interface IParams {
  artworkId?: string;
}

const ArtworkModal = async ({ params }: { params: IParams }) => {
  return (
    <Modal>
      <div className='bg-red-400 w-20 h-20'>MODAL</div>
    </Modal>
  );
};
export default ArtworkModal;
