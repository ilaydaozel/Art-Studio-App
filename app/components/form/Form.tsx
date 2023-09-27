'use client';

import { useCallback } from 'react';
import Button from '../buttons/Button';
import styled from 'styled-components';
import Heading from '../heading/Heading';

interface FormProps {
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  submitActionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Form = ({
  onSubmit,
  title,
  body,
  submitActionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: FormProps) => {
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

  const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    gap: 4px;
    width: full;
    padding: 2vw 0;
  `;

  return (
    <div
      className='w-full               
      flex 
     flex-col 
        items-center 
     justify-center
     bg-white
     py-6
     gap-4
      '
    >
      <div
        className='
              w-[80vw]
            '
      >
        <div
          className='
            flex 
            items-center 
            justify-center
            border-b-[1px]
            pt-20
            pb-2
            '
        >
          <Heading title={title} />
        </div>
        <div className='p-[4vw]'>
          {body}
          <ButtonContainer>
            {secondaryAction && secondaryActionLabel && (
              <Button
                width='25%'
                disabled={disabled}
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
              />
            )}
            <Button
              width='25%'
              disabled={disabled}
              label={submitActionLabel}
              onClick={handleSubmit}
            />
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
};

export default Form;
