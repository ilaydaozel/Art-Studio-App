import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useBiographyModal from '@/app/[lang]/hooks/useBiographyModal';
import Modal from './Modal';
import { IArtistProfile } from '@/app/[lang]/actions/type';

interface BiographyModalProps {
  artistProfile: IArtistProfile | null;
  onClose: () => void;
  onUpdate: () => void;
}

const BiographyModal = ({
  artistProfile,
  onClose,
  onUpdate,
}: BiographyModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bio, setBio] = useState(artistProfile?.biography);
  const biographyModal = useBiographyModal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      biography: bio,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    const { biography } = data;

    try {
      await axios.post(`/api/artistProfile/${artistProfile?.artistId}`, {
        biography,
      });
      toast.success('Biografi güncellendi!');
      biographyModal.onClose();
      onUpdate();
    } catch (error) {
      toast.error('Error');
      console.log('Biografi error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div>
      <textarea
        className='w-full min-h-[100px] h-[50vh] border-double border-2 border-neutral-300'
        id='biography'
        {...register('biography', { required: true })}
        placeholder='Hakkımda ..'
        onChange={(e) => {
          setBio(e.target.value);
        }}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={biographyModal.isOpen}
      title='Biografi'
      actionLabel='Güncelle'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default BiographyModal;
