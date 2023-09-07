'use client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from 'react-icons/bs';
import { IAnnouncement } from '@/app/[lang]/types';
import Slide from './Slide';

interface AnnouncementCarouselProps {
  slides: IAnnouncement[];
}

const NavButtonRight = styled.button`
  position: absolute;
  bottom: 1.5rem;
  left: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.6rem;
`;

const NavButtonLeft = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.6rem;
`;

const AnnouncementCarousel = ({ slides }: AnnouncementCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  return (
    <div className='w-[100vw] h-[100vh]'>
      <Slide slide={slides[activeIndex]}>
        <NavButtonRight onClick={goToPrevSlide}>
          <BsFillArrowLeftSquareFill />
        </NavButtonRight>
        <NavButtonLeft onClick={goToNextSlide}>
          <BsFillArrowRightSquareFill />
        </NavButtonLeft>
      </Slide>
    </div>
  );
};

export default AnnouncementCarousel;
