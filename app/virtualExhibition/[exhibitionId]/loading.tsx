import Spinner from '@/app/components/utils/Spinner';
import { COLORS } from '@/constants/colors';
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{ backgroundColor: COLORS.darkGray }}
      className='min-h-screen max-w-screen flex items-center justify-center z-20'
    >
      <div className='text-center'>
        <Spinner />
        <p className='text-3xl font-semibold mt-4 text-slate-400'>
          Sanal Sergi
        </p>
        <p className='text-3xl font-semibold mt-4 text-slate-300'>
          Konak Kültür Sanat Akademisi
        </p>
      </div>
    </div>
  );
}
