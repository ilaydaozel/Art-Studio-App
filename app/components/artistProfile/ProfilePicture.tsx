'use client';

import styled from 'styled-components';
import { IArtistProfile } from '../../types';
import useUpdatePictureModal from '../../hooks/useUpdatePictureModal';
import EditButton from '../buttons/EditButton';
import UpdatePictureModal from '../modal/UpdatePictureModal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProfileImageContainer = styled.div`
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
            <EditButton
              darkMode={true}
              onClick={updatePictureModal.onOpen}
            ></EditButton>
          </div>
        )}
      </ProfileImageContainer>
    </>
  );
};

export default ProfilePicture;
