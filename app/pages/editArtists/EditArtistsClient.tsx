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
import { ArtistProfile, User, UserArtwork } from '@prisma/client';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import EditArtistsPage from './page';

const NameHeading = styled.text`
  font-size: 3.5vw;
  font-weight: 600;
  color: ${COLORS.darkGray};
`;

interface EditArtistsClientProps {
  artists?: ArtistProfile[] | null;
}

const EditArtistsClient = ({ artists }: EditArtistsClientProps) => {
  console.log('artists: ', artists);
  const router = useRouter();
  const biographyModal = useBiographyModal();
  const profilePictureModal = useProfilePictureModal();
  const addArtworkModal = useAddArtworkModal();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    router.refresh();
  };
  const handleDelete = (artworkId: string) => {
    setIsLoading(true);

    axios
      .delete(`/api/userArtwork/${artworkId}`)
      .then(() => {
        toast.success('Sanatçı silindi!');
        refreshPage();
      })
      .catch(() => {
        toast.error('Bir şeyler yanlış gitti');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <div className='p-[2vw]'>
        <div className='flex flex-col'>
          <NameHeading>hello</NameHeading>
        </div>
      </div>
    </div>
  );
};

export default EditArtistsClient;
