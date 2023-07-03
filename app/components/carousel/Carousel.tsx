'use client';
import styled from 'styled-components';
import { useState } from 'react';
import { Slide } from '@/models/slide';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { COLORS } from '@/constants/colors';
interface CarouselProps {
  slides: Slide[];
}

const SlideContainer = styled.div<{ src: string }>`
  position: relative;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 80vh;
`;

const SlideForeground = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 80vh;
`;

const Caption = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 16px;
`;

const NavButtonRight = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: ${COLORS.lightGray};
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
  color: ${COLORS.lightGray};
  font-size: 24px;
  left: 0;
`;
const Carousel = ({ slides }: CarouselProps) => {
  console.log(slides);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div>
      <div>
        <SlideContainer src={slides[activeIndex].src}>
          <SlideForeground>
            <NavButtonLeft onClick={goToPrevSlide}>
              <FaChevronLeft />
            </NavButtonLeft>
            <Caption>{slides[activeIndex].caption}</Caption>
            <NavButtonRight onClick={goToNextSlide}>
              <FaChevronRight />
            </NavButtonRight>
          </SlideForeground>
        </SlideContainer>
      </div>
    </div>
  );
};

export default Carousel;
