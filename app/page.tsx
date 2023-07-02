import Image from 'next/image';
import { Inter } from 'next/font/google';
import React from 'react';
import Carrousel from './components/carousel/ArtworkCarousel';

export default function Home() {
  return (
    <div>
      <Carrousel
        images={[
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2_KsyjvB30UC5RVHpFmna6jr3P_-PvIxZ9w&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisLZpbdmJ4kWDgUvpoWFG33PG2UQ0xgUZzw&usqp=CAU',
        ]}
        captions={['Test 1', 'Text 2']}
      />
    </div>
  );
}
