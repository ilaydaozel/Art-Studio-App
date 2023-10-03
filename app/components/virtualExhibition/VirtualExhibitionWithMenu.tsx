'use client';
import styled from 'styled-components';
import ThreeDExhibition from './ThreeDExhibition';
import { IExhibition } from '@/app/types';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MovementIconsMenu from './MovementIconsMenu';
interface GalleryProps {
  exhibition: IExhibition;
}

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 50%;
  height: auto;
  max-height: 80%;
  overflow-y: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
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
const CoverImage = styled.div<{ backgroundImgUrl: string }>`
  width: 100%;
  height: 30vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.backgroundImgUrl});
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

const VirtualExhibitionWithMenu = ({ exhibition }: GalleryProps) => {
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
    <div className='relative'>
      <div className='relative'>
        <ThreeDExhibition artworks={exhibition.artworks}></ThreeDExhibition>
      </div>

      <div
        id='hamburgerMenu'
        ref={menuRef}
        onClick={toggleOpen}
        className='absolute bottom-10 right-6 cursor-pointer flex items-center justify-center md:w-[30px] md:h-[30px] w-[24px] h-[24px] rounded-full bg-white'
      >
        <AiOutlineMenu className='md:w-[16px] md:h-[16px] w-[14px] h-[14px] text-neutral-500' />
      </div>
      <div
        id='movementIconsMenu'
        className='absolute bottom-6 left-6 cursor-pointer'
      >
        <MovementIconsMenu />
      </div>

      {isMenuOpen && (
        <MenuContainer id='menu'>
          <div className='w-[100%] h-[30vh] relative'>
            <Image
              src={exhibition?.coverImage || ''}
              alt={'exhibition cover image'}
              fill
              priority
              placeholder='blur'
              blurDataURL={exhibition?.coverImage || ''}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <InformationContainer>
            <ExhibitionTitle>{exhibition.title}</ExhibitionTitle>
            <div className='flex flex-col justify-center items-center'>
              {exhibition.description && (
                <InfoText>{exhibition.description}</InfoText>
              )}
              <InfoText>Başlamak için ENTER a basın.</InfoText>
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
