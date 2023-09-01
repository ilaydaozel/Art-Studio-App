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
  isFullScreen?: boolean;
}

const PopupContainer = styled.div<{
  width: string;
  isFullScreen: boolean;
}>`
  position: fixed;
  width: ${(props) => props.width};
  top: ${(props) => (props.isFullScreen ? '0' : '50%')};
  left: ${(props) => (props.isFullScreen ? '0' : '50%')};
  transform: ${(props) =>
    props.isFullScreen ? 'none' : 'translate(-50%, -50%)'};
  height: auto;
  max-height: 100vh;
  padding: ${(props) => (props.isFullScreen ? 'none' : '2rem')};
  border-radius: ${(props) => (props.isFullScreen ? '0' : '0.5rem')};
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  isFullScreen = false,
}: PopupProps) => {
  return (
    <PopupContainer width={width} isFullScreen={isFullScreen}>
      <CloseButton onClick={onClose}>X</CloseButton>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {body}
      {onSubmit && (
        <SlidingButton label={actionLabel} onClick={onSubmit}></SlidingButton>
      )}
    </PopupContainer>
  );
};

export default Popup;
