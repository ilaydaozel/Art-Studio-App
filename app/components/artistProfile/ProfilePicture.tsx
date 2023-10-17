'use client';

import styled from 'styled-components';
import { IArtistProfile } from '../../types';
import useUpdatePictureModal from '../../hooks/useUpdatePictureModal';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import UpdatePictureModal from '../modal/UpdatePictureModal';
import { useRouter } from 'next/navigation';

const ProfileImage = styled.img<{ imageUrl: string }>`
  width: 100%;
  height: auto;
  content: url(${(props) => props.imageUrl});
`;
const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
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
        <ProfileImage
          imageUrl={artistProfile?.profilePic || '/images/blurImage.jpg'}
        ></ProfileImage>
        {isEditable ? (
          <TextButton
            label='Düzenle'
            icon={FaRegEdit}
            onClick={updatePictureModal.onOpen}
          ></TextButton>
        ) : (
          <></>
        )}
      </ProfileImageContainer>
    </>
  );
};

export default ProfilePicture;
