'use client';
import Image from 'next/image';
import useBiographyModal from '@/app/hooks/useBiographyModal';
import useProfilePictureModal from '@/app/hooks/useProfilePictureModal';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import useAddArtworkModal from '@/app/hooks/useAddArtworkModal';
import BiographyModal from '@/app/components/modal/BiographyModal';
import { useRouter } from 'next/navigation';
import ProfilePictureModal from '@/app/components/modal/ProfilePictureModal';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';
import { useState } from 'react';
import ArtworkContainer from '@/app/components/artwork/ArtworkContainer';
import { UserArtwork } from '@prisma/client';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const NameHeading = styled.text`
  font-size: 2rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
`;
const BiographyHeading = styled.text`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLORS.darkGray};
`;
const BiographyContent = styled.text`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${COLORS.gray};
`;
const HeadingContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: solid 1px;
  border-color: ${COLORS.lightGray};
  padding: 3% 1% 1% 0;
`;
const InformaionContainer = styled.div`
  margin: 6% 2% 3% 2%;
  display: flex;
  align-items: center;
  gap: 4%;
`;

interface ArtistProfileProps {
  profileInfo?: any | null;
  artworks?: UserArtwork[] | null;
}

const ArtistProfile = ({ profileInfo, artworks }: ArtistProfileProps) => {
  const router = useRouter();
  const biographyModal = useBiographyModal();
  const profilePictureModal = useProfilePictureModal();

  return (
    <div>
      <div className='p-[2vw]'>
        <div className='flex flex-col'>
          <HeadingContainer>
            <NameHeading>
              {profileInfo?.user.name} {profileInfo?.user.surname}
            </NameHeading>
          </HeadingContainer>

          <InformaionContainer>
            <div className='flex flex-col items-end pt-12'>
              <div className='p-1 shadow-lg'>
                <Image
                  width={350}
                  height={300}
                  src={profileInfo?.profilePic || ''}
                  alt={'profile Image'}
                />
              </div>
            </div>
            <div className='w-full min-h-[50vh]'>
              <BiographyHeading>Biografi</BiographyHeading>
              <BiographyContent>{profileInfo?.biography}</BiographyContent>
            </div>
          </InformaionContainer>
          <div>
            <div className='p-10 rounded-xl flex flex-col items-end justify-center'>
              <div className='flex w-full flex-wrap justify-around'>
                {artworks?.map((currentArtwork: UserArtwork) => (
                  <div className='flex flex-col items-end'>
                    <ArtworkContainer
                      artwork={currentArtwork}
                    ></ArtworkContainer>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
