'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import Image from 'next/image';
import SlidingButton from '@/app/components/buttons/SlidingButton';
import { useState } from 'react';
import Gallery from './Gallery';
import Popup from '@/app/components/popup/Popup';
import { IUserArtwork } from '@/app/actions/type';
import StartMenu from '@/app/components/virtualExhibition/StartMenu';

interface GalleryProps {
  artworks?: IUserArtwork[];
}

const MenuContainer = styled.div`
  width: 60%;
  margin: 20px;
  height: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const ExhibitionMenu = ({ artworks = [] }: GalleryProps) => {
  const [showExhibition, setShowExhibition] = useState(false);
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
        <InformationContainer>
          <text className='text-3xl m-2'>SANAL SERGİ</text>
          <button
            id='start_button'
            className='text-xl bg-yellow-300 p-2 rounded-lg m-4'
            onClick={() => setShowExhibition(true)}
          >
            Sergiyi Gör
          </button>
        </InformationContainer>
        {showExhibition && (
          <Popup
            onClose={() => setShowExhibition(false)}
            width='100%'
            isFullScreen
            body={<StartMenu artworks={artworks}></StartMenu>}
          ></Popup>
        )}
      </MenuContainer>
    </>
  );
};
export default ExhibitionMenu;
