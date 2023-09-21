import { COLORS } from '@/constants/colors';
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{ backgroundColor: COLORS.lightGray }}
      className='min-h-screen max-w-screen flex items-center justify-center'
    >
      <div className='text-center'>
        <div className='border-t-4 border-gray-50 border-solid rounded-full animate-spin h-12 w-12 mx-auto'></div>
        <p className='text-3xl font-semibold mt-4 text-gray-800'>
          Konak Kültür Sanat Akademisi
        </p>
      </div>
    </div>
  );
}
