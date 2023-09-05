'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'hkxhm69e';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  label = '',
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {label != '' ? (
        <h1 className='font-semibold text-neutral-600 text-lg m-2'>{label}</h1>
      ) : (
        <></>
      )}
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className='
              relative
              w-[80%]
              min-h-[30vh]
              m-4
              p-4
              flex
              flex-col
              justify-center
              items-center
              gap-4
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2
              border-neutral-300
              text-neutral-600
            '
            >
              <TbPhotoPlus size={30} />
              <div className='font-semibold text-md'>
                Fotoğraf yüklemek için tıkla
              </div>
              {value && (
                <div
                  className='
              absolute inset-0 w-full h-full bg-white'
                >
                  <Image
                    fill
                    style={{ objectFit: 'contain', padding: '1%' }}
                    src={value}
                    alt='Picture'
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
