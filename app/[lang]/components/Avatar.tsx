'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string;
  height?: number;
  width?: number;
}

const Avatar = ({
  src = 'https://cdn-icons-png.flaticon.com/512/666/666201.png',
  height = 20,
  width = 20,
}: AvatarProps) => {
  return (
    <Image
      className='rounded-full'
      height={height}
      width={width}
      alt='Avatar'
      src={src}
    />
  );
};

export default Avatar;
