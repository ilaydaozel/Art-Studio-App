'use client';

import Button from '@/app/components/buttons/Button';
import useTranslate from '../hooks/useTranslate';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  console.log('error ppage: ', error);
  const t = useTranslate();
  const exceptionsLocation = { element: 'exceptions' };
  const location = { element: 'error_page' };

  return (
    <div className='grid gap-y-10 w-full h-screen bg-white place-content-center place-items-center'>
      <div className='grid gap-y-4 place-items-center'>
        <p className='text-md text-center text-gray-500 sm:text-xl'>
          {t('caption', location)} 🥲
        </p>
        <p className='text-2xl text-center font-bold text-gray-900 sm:text-3xl'>
          {t(error.message, exceptionsLocation) ||
            t('unknownError', exceptionsLocation)}
        </p>
      </div>
      <div className='flex gap-x-4 w-full justify-center items-center'>
        <Button
          onClick={() => window.location.reload()}
          label={t('reset_button_label', location)}
          width='140px'
        />
        <Button
          onClick={() => window.location.replace('/')}
          label={t('home_button_label', location)}
          width='140px'
          bgColor='#000000'
        />
      </div>
    </div>
  );
}
