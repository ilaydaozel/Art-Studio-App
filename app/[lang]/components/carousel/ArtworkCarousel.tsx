'use client';

import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

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
            <Image
              width={300}
              height={300}
              src={image}
              alt={`Slide ${index + 1}`}
            />
            <p>{captions[index]}</p>
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default ArtworkCarousel;
