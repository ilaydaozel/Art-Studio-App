import React from 'react';

export default function Loading() {
  return (
    <div className='min-h-screen max-w-screen flex items-center justify-center bg-slate-200'>
      <div className='text-center'>
        <div className='border-t-4 border-gray-200 border-solid rounded-full animate-spin h-12 w-12 mx-auto'></div>
        <p className='text-3xl font-semibold mt-4 text-gray-800'>
          Konak Kültür Sanat Akademisi
        </p>
      </div>
    </div>
  );
}
