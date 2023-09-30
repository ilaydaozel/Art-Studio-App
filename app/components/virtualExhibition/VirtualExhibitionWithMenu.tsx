'use client';
import styled from 'styled-components';
import ThreeDExhibition from './ThreeDExhibition';
import { IArtwork } from '@/app/types';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
interface GalleryProps {
  artworks: IArtwork[];
}

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  max-height: 80%;
  overflow-y: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const StartButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.25rem 1rem;
  margin: 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.5s;
  background-color: ${COLORS.darkGray};
  color: white;
  &:hover {
    transform: scale(1.05);
  }
`;
const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  gap: 5px;
`;

const ExhibitionTitle = styled.text`
  font-size: 1rem;
  color: ${COLORS.darkGray};
  font-weight: bold;
`;
const InfoText = styled.text`
  font-size: 0.5rem;
  color: ${COLORS.darkGray};
`;

const VirtualExhibitionWithMenu = ({ artworks }: GalleryProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleOpen = useCallback(() => {
    setIsMenuOpen((value) => !value);
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the menu and the menu is open, close it
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleStartClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='relative max-w-full'>
      <ThreeDExhibition artworks={artworks}></ThreeDExhibition>
      <div className='absolute bottom-10 right-6' id='menuRef' ref={menuRef}>
        <div
          onClick={toggleOpen}
          className='cursor-pointer flex items-center justify-center md:w-[30px] md:h-[30px] w-[24px] h-[24px] rounded-full bg-white'
        >
          <AiOutlineMenu className='md:w-[16px] md:h-[16px] w-[14px] h-[14px] text-neutral-500' />
        </div>
      </div>
      {isMenuOpen && (
        <MenuContainer id='menu'>
          <Image
            src={
              'https://res.cloudinary.com/dnlz4muyb/image/upload/v1691094915/j0dfdld8wjk1cdgb8afs.jpg'
            }
            placeholder='empty'
            alt='artwork'
            width={100}
            height={100}
            className='object-cover'
          />

          <InformationContainer>
            <ExhibitionTitle>Sanal Sergi Deneyimi</ExhibitionTitle>
            <div className='flex flex-col justify-center items-center'>
              <InfoText>Başlamak için ENTER a basın.</InfoText>
              <InfoText>
                Gezinmek için ok tuşlarını veya W A S D tuşlarını kullanın.
              </InfoText>
              <InfoText>Etrafa bakmak için fareyi hareket ettirin.</InfoText>
              <InfoText>Çıkmak için sağ üstteki çarpıya basın.</InfoText>
            </div>
            <StartButton id='start_button' onClick={handleStartClick}>
              Sergiyi Gör
            </StartButton>
          </InformationContainer>
        </MenuContainer>
      )}
    </div>
  );
};
export default VirtualExhibitionWithMenu;
