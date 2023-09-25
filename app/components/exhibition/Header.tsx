'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile, IArtwork, IExhibition } from '../../types';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import Popup from '../popup/Popup';
import useTranslate from '../../hooks/useTranslate';

interface HeaderProps {
  exhibition: IExhibition;
}

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const HeaderImage = styled.div<{ imageUrl: string }>`
  width: 50%;
  height: 100%;
  position: absolute;
  transform: translateX(100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
`;

const InfoHeading = styled.text`
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  margin: 10px;
  color: ${COLORS.darkGray};
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Header = ({ exhibition }: HeaderProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setHeaderArtwork] = useState(exhibition?.coverImage || '');

  const location = { element: 'artist_profile', superElement: 'header' };
  const t = useTranslate();

  return (
    <>
      <HeadingContainer>
        <div className='flex flex-col justify-center items-center w-[50%] h-full'>
          <InfoHeading>{exhibition.title}</InfoHeading>
        </div>
        <HeaderImage imageUrl={coverImage}></HeaderImage>
      </HeadingContainer>
    </>
  );
};

export default Header;
