import { COLORS } from '@/constants/colors';
import React from 'react';
import Spinner from '../components/utils/Spinner';
export default function Loading() {
  return (
    <div className='min-h-screen max-w-screen flex items-center justify-center z-20 bg-neutral-900'>
      <div className='text-center'>
        <Spinner />
        <p className='text-3xl font-semibold mt-4 text-neutral-300'>
          Konak Kültür Sanat Akademisi
        </p>
      </div>
    </div>
  );
}
