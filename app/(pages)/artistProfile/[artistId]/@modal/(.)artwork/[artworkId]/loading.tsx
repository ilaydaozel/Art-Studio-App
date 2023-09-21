import Spinner from '@/app/components/utils/Spinner';
import React from 'react';

export default function Loading() {
  return (
    <div className='fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 flex items-center justify-center'>
      <Spinner />
    </div>
  );
}
