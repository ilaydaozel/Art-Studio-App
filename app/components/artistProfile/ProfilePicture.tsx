'use client';

import styled from 'styled-components';
import { IArtistProfile } from '../../types';
import useUpdatePictureModal from '../../hooks/useUpdatePictureModal';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import UpdatePictureModal from '../modal/UpdatePictureModal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProfileImageContainer = styled.div`
  position: relative;
  width: 30%;
  height: 50vh;
  @media (max-width: 992px) {
    width: 40%;
  }
`;

interface ProfilePictureProps {
  artistProfile: IArtistProfile;
  isEditable: boolean;
}

const ProfilePicture = ({
  artistProfile,
  isEditable = false,
}: ProfilePictureProps) => {
  const updatePictureModal = useUpdatePictureModal();
  const router = useRouter();
  const refreshPage = () => {
    router.refresh();
  };

  return (
    <>
      <UpdatePictureModal
        artistProfile={artistProfile}
        onClose={updatePictureModal.onClose}
        onUpdate={refreshPage}
      />
      <ProfileImageContainer>
        <Image
          src={artistProfile?.profilePic || '/images/blurImage.jpg'}
          alt={'Artist profile picture'}
          fill
          placeholder='blur'
          blurDataURL={'/images/blurImage.jpg'}
          style={{
            objectFit: 'cover',
          }}
        />
        {isEditable && (
          <div className='absolute top-1 right-1'>
            <TextButton
              darkMode={true}
              icon={FaRegEdit}
              onClick={updatePictureModal.onOpen}
            ></TextButton>
          </div>
        )}
      </ProfileImageContainer>
    </>
  );
};

export default ProfilePicture;
