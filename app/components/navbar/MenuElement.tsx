'use client';
import React from 'react';
import Link from 'next/link';

interface MenuElementProps {
  address: string;
  displayName: string;
}

const MenuElement = ({ address, displayName }: MenuElementProps) => {
  return (
    <div
      className='
      text-sm
        py-2
        px-4
        hover:bg-neutral-100
        transition
        cursor-pointer'
    >
      <Link href={address}>{displayName}</Link>
    </div>
  );
};

export default MenuElement;
