'use client';
import styled from 'styled-components';
import ThreeDExhibition from './ThreeDExhibition';
import { IExhibition } from '@/app/types';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MovementIconsMenu from './MovementIconsMenu';
import { RiFullscreenFill } from 'react-icons/ri';
import { ROUTE_PATHS } from '@/constants/routes';
import { BiArrowBack } from 'react-icons/bi';
interface GalleryProps {
  exhibition: IExhibition;
  small?: boolean;
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

const StartButton = styled.button<{ small: boolean }>`
  display: flex;
  justify-content: center;
  padding: ${(props) => (props.small ? '0.25rem 1rem' : '0.1rem 0.4rem')};
  margin: 1rem;
  font-size: ${(props) => (props.small ? '0.8rem' : '1rem')};
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

const VirtualExhibitionWithMenu = ({
  exhibition,
  small = false,
}: GalleryProps) => {
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
        <ThreeDExhibition
          artworks={exhibition.artworks}
          small={small}
        ></ThreeDExhibition>
      </div>

      <div
        id='hamburgerMenu'
        ref={menuRef}
        onClick={toggleOpen}
        className='absolute top-12 right-6 cursor-pointer flex items-center justify-center md:w-8 md:h-8 w-6 h-6 rounded-full bg-white'
      >
        <AiOutlineMenu className='md:w-4 md:h-4 w-3 h-3 text-neutral-500' />
      </div>
      <div
        id='movementIconsMenu'
        className='absolute bottom-6 right-36 cursor-pointer'
      >
        <MovementIconsMenu />
      </div>

      {small ? (
        <a href={`${ROUTE_PATHS.VIRTUAL_EXHIBITION}/${exhibition.id}`}>
          <div className='absolute bottom-6 left-6 cursor-pointer hover:bg-slate-800 bg-slate-600 opacity-50 p-1 rounded-md'>
            <RiFullscreenFill className='md:w-6 md:h-6 w-4 h-4  text-neutral-200' />
          </div>
        </a>
      ) : (
        <a href={`${ROUTE_PATHS.EXHIBITION}/${exhibition.id}`}>
          <div className='absolute bottom-6 left-6 cursor-pointer hover:bg-slate-800 bg-slate-600 opacity-50 p-1 rounded-md'>
            <BiArrowBack className='md:w-6 md:h-6 w-4 h-4  text-neutral-200' />
          </div>
        </a>
      )}
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
            <StartButton
              small={small}
              id='start_button'
              onClick={handleStartClick}
            >
              Sergiyi Gör
            </StartButton>
          </InformationContainer>
        </MenuContainer>
      )}
    </div>
  );
};
export default VirtualExhibitionWithMenu;
