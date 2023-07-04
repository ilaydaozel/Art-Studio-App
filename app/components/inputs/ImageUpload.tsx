'use client';

import { COLORS } from '@/constants/colors';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import styled from 'styled-components';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'hkxhm69e';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  const Heading = styled.h1`
    color: ${COLORS.gray};
  `;
  return (
    <div>
      <Heading>Fotoğraf Yükle</Heading>
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
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-40
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
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
              absolute inset-0 w-full h-full'
                >
                  <Image
                    fill
                    style={{ objectFit: 'cover' }}
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
