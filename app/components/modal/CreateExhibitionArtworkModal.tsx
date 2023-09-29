'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Selectbox from '../inputs/Selectbox';
import { IArtistProfile, IArtwork } from '@/app/types';
import SelectboxArtists from '../inputs/SelectboxArtists';
import Radio from '../inputs/Radio';
import useCreateExhibitionArtworkModal from '@/app/hooks/useCreateExhibitionArtworkModal';
import styled from 'styled-components';
import useTranslate from '@/app/hooks/useTranslate';

enum STEPS {
  INFORMATION = 0,
  PHOTO = 1,
}
interface CreateExhibitionArtworkModalProps {
  allArtistProfiles: IArtistProfile[];
}

const RadioWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

const CreateExhibitionArtworkModal = ({
  allArtistProfiles,
}: CreateExhibitionArtworkModalProps) => {
  const createExhibitionArtworkModal = useCreateExhibitionArtworkModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFORMATION);
  const [selectedOption, setSelectedOption] = useState('user');
  const t = useTranslate();
  const exceptionsLocation = { element: 'exceptions' };
  const location = { element: 'create_artwork_modal' };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

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
      artistName: '',
      artistSurname: '',
      artistId: '',
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
  const artistName = watch('artistName');
  const artistSurname = watch('artistSurname');
  const artistId = watch('artistId');

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
    if (step !== STEPS.PHOTO) {
      return onNext();
    }

    setIsLoading(true);

    let artwork: any;
    let apiLink: string = '';
    if (selectedOption === 'user') {
      apiLink = `/api/artwork/createUserArtwork/${artistId}`;
      const selectedArtist = allArtistProfiles.find(
        (artist) => artist.user.id === artistId
      );
      if (selectedArtist) {
        artwork = {
          title: title,
          artistName: selectedArtist.user.name,
          artistSurname: selectedArtist.user.surname,
          description: description,
          creationYear: creationYear,
          medium: medium,
          type: type,
          width: typeof width === 'string' ? Number(width) : width,
          height: typeof height === 'string' ? Number(height) : height,
          artworkMedias: [media],
          exhibitionIds: [],
        };
      }
    } else if (selectedOption === 'guest') {
      apiLink = `/api/artwork/createGuestArtwork`;
      artwork = {
        title: title,
        artistName: artistName,
        artistSurname: artistSurname,
        description: description,
        creationYear: creationYear,
        medium: medium,
        type: type,
        width: typeof width === 'string' ? Number(width) : width,
        height: typeof height === 'string' ? Number(height) : height,
        artworkMedias: [media],
      };
    }

    try {
      const response = await axios.post(apiLink, artwork);
      if (response.data.error) {
        toast.error(t(response.data.error, exceptionsLocation));
      } else {
        toast.success(t('creation_successful_message', location));
        window.location.reload();
        reset();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? t(error.message, exceptionsLocation)
          : t('unknownError', exceptionsLocation)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PHOTO) {
      return 'Tamamla';
    }

    return 'İleri';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFORMATION) {
      return undefined;
    }

    return 'Geri';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-row justify-between flex-wrap'>
      <RadioWrapper>
        <Radio
          id='option1'
          label='Akademi Sanatçısı'
          value='user'
          checked={selectedOption === 'user'}
          onChange={handleOptionChange}
        />

        <Radio
          id='option2'
          label='Akademi Dışı'
          value='guest'
          checked={selectedOption === 'guest'}
          onChange={handleOptionChange}
        />
      </RadioWrapper>
      {selectedOption === 'user' && (
        <SelectboxArtists
          id='artistId'
          label='Sanatçı Adı Soyadı'
          disabled={isLoading}
          register={register}
          errors={errors}
          choices={allArtistProfiles || []}
        />
      )}
      {selectedOption === 'guest' && (
        <>
          <Input
            id='artistName'
            label='Sanatçı Adı'
            width='49%'
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          <Input
            id='artistSurname'
            label='Sanatçı Soyadı'
            width='49%'
            disabled={isLoading}
            register={register}
            errors={errors}
          />
        </>
      )}
      <Input
        id='title'
        label='Başlık'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='description'
        label='Açıklama'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='creationYear'
        label='Yapım Yılı'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Selectbox
        id='medium'
        label='Teknik'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        choices={['Yağlıboya', 'Akrilik', 'Suluboya', 'Karakalem', 'Karışık']}
      />
      <Selectbox
        id='type'
        label='Tür'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        choices={['Tablo', 'Kağıt']}
      />
      <Input
        id='width'
        label='Yükseklik'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='number'
        required
      />
      <Input
        id='height'
        label='Uzunluk'
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
      isOpen={createExhibitionArtworkModal.isOpen}
      title='Eser Ekle'
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFORMATION ? undefined : onBack}
      onClose={createExhibitionArtworkModal.onClose}
      body={bodyContent}
    />
  );
};

export default CreateExhibitionArtworkModal;
