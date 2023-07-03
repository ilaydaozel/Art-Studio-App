'use client';
import styled from 'styled-components';
import { useState } from 'react';
import Image from 'next/image';
import { Slide } from '@/models/slide';

interface CarouselProps {
  slides: Slide[];
}
const SlideContainer = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px; /* Set an appropriate height for your carousel slides */
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

const Carousel = ({ slides }: CarouselProps) => {
  console.log(slides);
  return (
    <div>
      <div>
        {slides.map((slide, index) => (
          <SlideContainer key={index} src={slide.src}>
            <Caption>{slide.caption}</Caption>
          </SlideContainer>
        ))}
      </div>
      <div className='h-6'></div>
    </div>
  );
};

export default Carousel;
