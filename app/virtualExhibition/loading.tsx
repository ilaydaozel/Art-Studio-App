import { COLORS } from '@/constants/colors';
import React from 'react';
import Spinner from '../components/utils/Spinner';
export default function Loading() {
  return (
    <div
      style={{ backgroundColor: COLORS.darkGray }}
      className='min-h-screen max-w-screen flex items-center justify-center'
    >
      <div className='text-center'>
        <Spinner />
        <p className='text-3xl font-semibold mt-4 text-slate-300'>
          Sanal Sergi
        </p>
      </div>
    </div>
  );
}
