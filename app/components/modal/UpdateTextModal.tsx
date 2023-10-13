import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useBiographyModal from '@/app/hooks/useUpdateTextModal';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import useTranslate from '@/app/hooks/useTranslate';
import { updateData } from '../utils/Helper';

interface BiographyModalProps {
  script: string;
  label: string;
  onClose: () => void;
  onSubmit: (newText: string) => any;
}

const BiographyModal = ({
  script,
  onClose,
  onSubmit,
  label,
}: BiographyModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const biographyModal = useBiographyModal();
  const router = useRouter();
  const t = useTranslate();
  const location = { element: 'update_text_modal' };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      text: script,
    },
  });

  const text = watch('text');

  const submit: SubmitHandler<FieldValues> = async () => {
    await updateData(
      onSubmit(text),
      setIsLoading,
      t,
      location,
      biographyModal.onClose,
      router
    );
  };

  const bodyContent = (
    <div>
      <textarea
        className='w-full min-h-[100px] h-[50vh] border-double border-2 border-neutral-300'
        id='text'
        {...register('text', { required: true })}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={biographyModal.isOpen}
      title={label}
      actionLabel={t('action_label', location)}
      onClose={onClose}
      onSubmit={handleSubmit(submit)}
      body={bodyContent}
    />
  );
};

export default BiographyModal;
