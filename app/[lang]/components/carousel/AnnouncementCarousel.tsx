'use client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from 'react-icons/bs';
import { IAnnouncement } from '@/app/[lang]/actions/type';
import Slide from './Slide';

interface AnnouncementCarouselProps {
  slides: IAnnouncement[];
}

const NavButton = styled.button<{ position: string }>`
  position: absolute;
  bottom: 0.5rem;
  left: ${(props) => props.position === 'left' && '1rem'};
  right: ${(props) => props.position === 'right' && '1rem'};
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
    <Slide slide={slides[activeIndex]}>
      <>
        <NavButton position='left' onClick={goToPrevSlide}>
          <BsFillArrowLeftSquareFill />
        </NavButton>
        <NavButton position='right' onClick={goToNextSlide}>
          <BsFillArrowRightSquareFill />
        </NavButton>
      </>
    </Slide>
  );
};

export default AnnouncementCarousel;
