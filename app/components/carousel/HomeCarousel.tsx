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
`;

const SlideForeground = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
`;

const CaptionContainer = styled.div`
  position: relative;
  background-position: center;
  width: 80%;
  height: 46vh;
  top: 40%;
  left: 4%;
`;

const Caption = styled.p`
  position: absolute;
  top: 20%;
  left: 5%;
  padding: 10px;
  color: #fff;
  font-size: 3rem;
`;
const Subcaption = styled.p`
  position: absolute;
  top: 50%;
  left: 5%;
  padding: 10px;
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
  }, []);

  return (
    <div>
      <div>
        <SlideContainer src={slides[activeIndex].src}>
          <SlideForeground>
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
          </SlideForeground>
        </SlideContainer>
      </div>
    </div>
  );
};

export default Carousel;
