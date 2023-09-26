'use client';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className='grid h-screen px-4 bg-white place-content-center'>
      <div className='text-center'>
        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Something went wrong ☹️
        </p>

        <p className='mt-4 text-gray-500'>
          {error.message || 'You must be logged in to access the page'}
        </p>

        <button
          type='button'
          onClick={() => window.location.reload()}
          className='inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-black rounded hover:bg-gray-800 focus:outline-none focus:ring cursor-pointer'
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
