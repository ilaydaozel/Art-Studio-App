import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useBiographyModal from '@/app/hooks/useUpdateTextModal';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import useTranslate from '@/app/hooks/useTranslate';

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
  const exceptionsLocation = { element: 'exceptions' };
  const location = { element: 'update_text_modal' };

  const refreshPage = () => {
    router.refresh();
  };

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
    setIsLoading(true);
    try {
      onSubmit(text).then((response: AxiosResponse<any, any>) => {
        if (response.data?.error) {
          toast.error(t(response.data.error, exceptionsLocation));
        } else {
          toast.success(t('update_successful_message', location));
          biographyModal.onClose();
          refreshPage();
        }
      });
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
