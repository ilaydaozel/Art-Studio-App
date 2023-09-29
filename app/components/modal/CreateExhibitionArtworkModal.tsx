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

enum STEPS {
  INFORMATION = 0,
  PHOTO = 1,
}
interface CreateExhibitionArtworkModalProps {
  allArtistProfiles?: IArtistProfile[];
}

const CreateExhibitionArtworkModal = ({
  allArtistProfiles,
}: CreateExhibitionArtworkModalProps) => {
  const createExhibitionArtworkModal = useCreateExhibitionArtworkModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFORMATION);
  const [selectedOption, setSelectedOption] = useState('');

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PHOTO) {
      return onNext();
    }

    setIsLoading(true);

    let artwork: any;

    if (allArtistProfiles) {
      const selectedArtist = allArtistProfiles.find(
        (artist) => artist.id === artistId
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
          artistId: artistId,
        };
      }
    }

    axios
      .post(`/api/artwork/createArtwork/${artistId}`, artwork)
      .then(() => {
        toast.success('Eser eklendi!');
        window.location.reload();
        reset();
      })
      .catch((e) => {
        toast.error('Bir şeyler yanlış gitti');
        console.log(' error ', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <div>
        <Radio
          id='option1'
          label='Option 1'
          value='option1'
          checked={selectedOption === 'option1'}
          onChange={handleOptionChange}
        />

        <Radio
          id='option2'
          label='Option 2'
          value='option2'
          checked={selectedOption === 'option2'}
          onChange={handleOptionChange}
        />
      </div>
      <SelectboxArtists
        id='artistId'
        label='Sanatçı Adı Soyadı'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        choices={allArtistProfiles || []}
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
