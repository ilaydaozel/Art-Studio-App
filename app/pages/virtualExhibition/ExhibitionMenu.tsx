'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import Image from 'next/image';
import SlidingButton from '@/app/components/buttons/SlidingButton';
import { useState } from 'react';
import Gallery from './Gallery';

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

const ExhibitionMenu = () => {
  const [showExhibition, setShowExhibition] = useState(false);
  return (
    <>
      <MenuContainer>
        {showExhibition ? (
          <>
            <button onClick={() => setShowExhibition(false)}>X</button>
            <Gallery></Gallery>
          </>
        ) : (
          <>
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
              <text className='text-xl'>SANAL SERGİ</text>
              <SlidingButton
                label='Sergiyi Gör'
                onClick={() => setShowExhibition(true)}
              ></SlidingButton>
            </InformationContainer>
          </>
        )}
      </MenuContainer>
    </>
  );
};
export default ExhibitionMenu;
