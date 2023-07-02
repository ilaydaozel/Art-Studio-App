'use client';
import styled from 'styled-components';
import { useState } from 'react';

import React from 'react';

import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CarouselProps {
  images: string[];
  captions: string[];
}

const ArtworkCarousel = ({ images, captions }: CarouselProps) => {
  return (
    <div className='h-20'>
      <ResponsiveCarousel>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
            <p>{captions[index]}</p>
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default ArtworkCarousel;
