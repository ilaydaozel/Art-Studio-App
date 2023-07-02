import Image from 'next/image';
import { Inter } from 'next/font/google';
import React from 'react';
import Carrousel from './components/carrousel/Carrousel';

export default function Home() {
  return (
    <div>
      <Carrousel></Carrousel>
    </div>
  );
}
