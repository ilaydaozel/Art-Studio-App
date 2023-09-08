'use client';

import styled from 'styled-components';
import { IArtistProfile } from '../../types';
import useProfilePictureModal from '../../hooks/useProfilePictureModal';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import ProfilePictureModal from '../modal/ProfilePictureModal';
import { useRouter } from 'next/navigation';

const ProfileImage = styled.img<{ imageUrl: string }>`
  width: 100%;
  height: auto;
  content: url(${(props) => props.imageUrl});
`;
const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ProfilePictureProps {
  artistProfile: IArtistProfile;
  isEditable: boolean;
}

const ProfilePicture = ({
  artistProfile,
  isEditable = false,
}: ProfilePictureProps) => {
  const profilePictureModal = useProfilePictureModal();
  const router = useRouter();
  const refreshPage = () => {
    router.refresh();
  };

  return (
    <>
      <ProfilePictureModal
        artistProfile={artistProfile}
        onClose={profilePictureModal.onClose}
        onUpdate={refreshPage}
      />
      <ProfileImageContainer className='xl:w-[35%] md:w-[40%] sm:w-[50%]'>
        <ProfileImage imageUrl={artistProfile?.profilePic || ''}></ProfileImage>
        {isEditable ? (
          <TextButton
            label='Düzenle'
            icon={FaRegEdit}
            onClick={profilePictureModal.onOpen}
          ></TextButton>
        ) : (
          <></>
        )}
      </ProfileImageContainer>
    </>
  );
};

export default ProfilePicture;
