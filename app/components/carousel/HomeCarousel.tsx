'use client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { COLORS } from '@/constants/colors';
interface CarouselProps {
  slides: Slide[];
}
interface Slide {
  src: string;
  caption: string;
  subcaption: string;
}

const SlideContainer = styled.div<{ src: string }>`
  position: relative;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  transition: background-image 0.8s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const CaptionContainer = styled.div`
  position: relative;
  background-position: center;
  height: 30%;
  top: 60%;
  left: 8%;
  right: 8%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Caption = styled.p`
  color: #fff;
  font-size: 3rem;
`;

const Subcaption = styled.p`
  color: #fff;
  font-size: 2rem;
`;

const NavButtonRight = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: ${COLORS.gray};
  font-size: 24px;
  right: 0;
`;
const NavButtonLeft = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: ${COLORS.gray};
  font-size: 24px;
  left: 0;
`;
const Carousel = ({ slides }: CarouselProps) => {
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
    <div>
      <div>
        <SlideContainer src={slides[activeIndex].src}>
          <NavButtonLeft onClick={goToPrevSlide}>
            <FaChevronLeft />
          </NavButtonLeft>
          <CaptionContainer>
            <Caption>{slides[activeIndex].caption}</Caption>
            <Subcaption>{slides[activeIndex].subcaption}</Subcaption>
          </CaptionContainer>

          <NavButtonRight onClick={goToNextSlide}>
            <FaChevronRight />
          </NavButtonRight>
        </SlideContainer>
      </div>
    </div>
  );
};

export default Carousel;
