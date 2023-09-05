'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
}
const Logo = ({ width = 40, height = 40 }: LogoProps) => {
  const router = useRouter();

  return (
    <Image
      alt='Logo'
      className='cursor-pointer'
      height={height}
      width={width}
      src='/images/logo.png'
    ></Image>
  );
};

export default Logo;
