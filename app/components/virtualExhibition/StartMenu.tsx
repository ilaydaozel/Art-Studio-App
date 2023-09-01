import styled from 'styled-components';
import ThreeDExhibition from './ThreeDExhibition';
import { IUserArtwork } from '@/app/actions/type';
import Image from 'next/image';

interface GalleryProps {
  artworks?: IUserArtwork[];
}

const MenuContainer = styled.div`
  position: fixed;
  width: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StartMenu = ({ artworks = [] }: GalleryProps) => {
  return (
    <>
      <MenuContainer>
        <div className='relative w-full h-[50%]'>
          <Image
            src={
              'https://res.cloudinary.com/dnlz4muyb/image/upload/v1691094915/j0dfdld8wjk1cdgb8afs.jpg'
            }
            placeholder='empty'
            alt='artwork'
            fill
            className='object-cover'
          />
        </div>
        Hello there
      </MenuContainer>
      <ThreeDExhibition artworks={artworks}></ThreeDExhibition>
    </>
  );
};
export default StartMenu;
