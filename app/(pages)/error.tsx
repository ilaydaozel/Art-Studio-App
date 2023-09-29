'use client';

import Button from '@/app/components/buttons/Button';
import Link from 'next/link';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className='grid gap-y-8 h-screen px-4 bg-white place-content-center place-items-center'>
      <div className='grid gap-y-4 place-items-center'>
        <p className='text-md text-gray-500 sm:text-lg'>
          There was a problem ☹️
        </p>
        <p className='text-2xl font-bold text-gray-900 sm:text-3xl'>
          {error.message || 'Something went wrong!'}
        </p>
      </div>
      <div className='flex gap-x-4 w-full justify-center items-center'>
        <Button
          onClick={() => window.location.reload()}
          label={'Try Again'}
          width='20%'
        />
        <Link className='hover:text-slate-700' href='/'>
          Go to home page
        </Link>
      </div>
    </div>
  );
}
