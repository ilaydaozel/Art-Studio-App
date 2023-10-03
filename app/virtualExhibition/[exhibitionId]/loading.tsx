import Spinner from '@/app/components/utils/Spinner';
import { COLORS } from '@/constants/colors';
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{ backgroundColor: COLORS.lightGray }}
      className='min-h-screen max-w-screen flex items-center justify-center'
    >
      <div className='text-center'>
        <Spinner />
        <p className='text-3xl font-semibold mt-4 text-slate-700'>
          Sanal Sergi
        </p>
        <p className='text-3xl font-semibold mt-4 text-slate-700'>
          Konak Kültür Sanat Akademisi
        </p>
      </div>
    </div>
  );
}
