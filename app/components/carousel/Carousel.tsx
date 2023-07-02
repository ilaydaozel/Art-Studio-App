'use client';
import styled from 'styled-components';
import { useState } from 'react';

interface CarouselProps {
  images: string[];
  captions: string[];
}

const Carousel = ({ images, captions }: CarouselProps) => {
  return (
    <div className='h-20'>
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
            <p>{captions[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
