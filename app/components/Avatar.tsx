'use client';

import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
  height?: number;
  width?: number;
}

const Avatar = ({ src, height = 20, width = 20 }: AvatarProps) => {
  return (
    <Image
      className='rounded-full'
      height={height}
      width={width}
      alt='Avatar'
      src={src ? src : 'https://cdn-icons-png.flaticon.com/512/666/666201.png'}
    />
  );
};

export default Avatar;
