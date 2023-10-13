'use client';

import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import useCreateArtworkModal from '@/app/hooks/useCreateArtworkModal';
import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Selectbox from '../inputs/Selectbox';
import { IArtistProfile } from '@/app/types';
import useTranslate from '@/app/hooks/useTranslate';
import { handleApiResponse } from '../utils/Helper';
import { useRouter } from 'next/navigation';

enum STEPS {
  INFORMATION = 0,
  PHOTO = 1,
}
interface CreateArtworkModalProps {
  artistProfile: IArtistProfile;
}

const CreateArtworkModal = ({ artistProfile }: CreateArtworkModalProps) => {
  const createArtworkModal = useCreateArtworkModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFORMATION);
  const t = useTranslate();
  const router = useRouter();
  const location = { element: 'create_artwork_modal' };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      creationYear: '',
      artistName: artistProfile.user.name,
      artistSurname: artistProfile.user.surname,
      medium: '',
      type: '',
      width: 0,
      height: 0,
      media: '',
    },
  });

  const title = watch('title');
  const description = watch('description');
  const creationYear = watch('creationYear');
  const type = watch('type');
  const medium = watch('medium');
  const width = watch('width');
  const height = watch('height');
  const media = watch('media');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const artistId = artistProfile.artistId;
    if (step !== STEPS.PHOTO) {
      return onNext();
    }
    setIsLoading(true);

    const artwork = {
      title: title,
      artistName: artistProfile.user.name,
      artistSurname: artistProfile.user.surname,
      description: description,
      creationYear: creationYear,
      medium: medium,
      type: type,
      width: typeof width === 'string' ? Number(width) : width,
      height: typeof height === 'string' ? Number(height) : height,
      artworkMedias: [media],
      exhibitionIds: [],
    };
    await handleApiResponse(
      axios.post(`/api/artwork/createUserArtwork/${artistId}`, artwork),
      setIsLoading,
      t,
      router,
      t('creation_successful_message', location),
      createArtworkModal.onClose,
      () => {
        reset();
        setStep(STEPS.INFORMATION);
      }
    );
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PHOTO) {
      return t('action_label', location);
    }

    return t('forward_label', location);
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFORMATION) {
      return undefined;
    }

    return t('back_label', location);
  }, [step]);

  let bodyContent = (
    <div className='flex flex-row justify-between flex-wrap'>
      <Input
        id='artistName'
        label={t('artist_name', location)}
        width='49%'
        disabled={true}
        register={register}
        errors={errors}
      />
      <Input
        id='artistSurname'
        label={t('artist_surname', location)}
        width='49%'
        disabled={true}
        register={register}
        errors={errors}
      />
      <Input
        id='title'
        label={t('title', location)}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='description'
        label={t('description', location)}
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='creationYear'
        label={t('creation_year', location)}
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Selectbox
        id='medium'
        label={t('medium', location)}
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        choices={['Yağlıboya', 'Akrilik', 'Suluboya', 'Karakalem', 'Karışık']}
      />
      <Selectbox
        id='type'
        label={t('type', location)}
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        choices={['Tablo', 'Kağıt']}
      />
      <Input
        id='width'
        label={t('width', location)}
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='number'
        required
      />
      <Input
        id='height'
        label={t('height', location)}
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='number'
        required
      />
    </div>
  );

  if (step === STEPS.PHOTO) {
    bodyContent = (
      <ImageUpload
        onChange={(value) => setCustomValue('media', value)}
        value={media}
      />
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={createArtworkModal.isOpen}
      title={t('form_title', location)}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFORMATION ? undefined : onBack}
      onClose={createArtworkModal.onClose}
      body={bodyContent}
    />
  );
};

export default CreateArtworkModal;
