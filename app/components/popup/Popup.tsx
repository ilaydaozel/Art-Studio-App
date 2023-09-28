'use client';

import styled from 'styled-components';
import SlidingButton from '../buttons/SlidingButton';

interface PopupProps {
  title?: string;
  subtitle?: string;
  body: React.ReactElement;
  actionLabel?: string;
  onClose: () => void;
  onSubmit?: () => void;
  width: string;
}

const PopupContainer = styled.div<{
  width: string;
}>`
  position: fixed;
  width: ${(props) => props.width};
  top: ${(props) => (props.width === '100%' ? '0' : '50%')};
  left: ${(props) => (props.width === '100%' ? '0' : '50%')};
  transform: ${(props) =>
    props.width === '100%' ? 'none' : 'translate(-50%, -50%)'};
  height: ${(props) => (props.width === '100%' ? '100vh' : 'auto')};
  max-height: 100vh;
  padding: ${(props) => (props.width === '100%' ? 'none' : '1.6rem')};
  border-radius: ${(props) => (props.width === '100%' ? '0' : '0.5rem')};
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 4px;
  box-shadow: 1rem 1rem 3rem 0 rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const Title = styled.h1`
  font-size: 1.2rem;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  margin-top: 0.2rem;
`;

const Popup = ({
  title,
  subtitle,
  body,
  actionLabel = '',
  onClose,
  onSubmit,
  width,
}: PopupProps) => {
  return (
    <PopupContainer width={width}>
      <CloseButton onClick={onClose}>X</CloseButton>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {body}
      {onSubmit && (
        <div className='flex justify-end w-[90%]'>
          <SlidingButton
            label={actionLabel}
            onClick={() => {
              onSubmit();
              onClose();
            }}
          ></SlidingButton>
        </div>
      )}
    </PopupContainer>
  );
};

export default Popup;
