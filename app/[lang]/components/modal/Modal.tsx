'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../buttons/Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  subtitle?: string;
  body?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className='
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50
          outline-none 
          focus:outline-none
          bg-neutral-800/70        
        '
      >
        <div
          className='
          relative 
          xs:w-5/6
          md:w-4/6
          lg:w-3/6
          h-auto
          '
        >
          {/*content*/}
          <div
            className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
          >
            <div
              className='
              translate
              h-full
              w-full
              lg:h-full
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              gap-2
              pb-4
              bg-white 
              outline-none 
              focus:outline-none
            '
            >
              {/*header*/}
              <div
                className='
                flex 
                flex-col
                items-center 
                p-2
                rounded-t
                justify-center
                relative
                border-b-[1px]
                '
              >
                <button
                  className='
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    right-4
                    top-2
                  '
                  onClick={handleClose}
                >
                  <IoMdClose size={16} />
                </button>

                <div className='flex flex-col p-2'>
                  <h1 className='md:text-xl font-semibold text-sm'>{title}</h1>
                  {subtitle && (
                    <h1 className='md:text-base text-center text-xs '>
                      {subtitle}
                    </h1>
                  )}
                </div>
              </div>

              {/*body*/}
              <div className='relative flex-auto px-6'>{body}</div>
              {/*footer*/}
              <div
                className='
                    flex 
                    flex-row 
                    items-center 
                    justify-center
                    gap-4 
                    w-full
                    bg-white
                    px-6
                  '
              >
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    outline
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;