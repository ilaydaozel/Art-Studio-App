import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IAnnouncement } from '@/app/types';

interface SlideProps {
  slide: IAnnouncement;
  children?: React.ReactNode;
  isMini?: boolean;
}

const SlideContainer = styled.div<{ src: string }>`
  position: relative;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: background-image 0.4s ease-in-out;
  width: 100%;
  height: 100%;
  min-width: 200px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Caption = styled.p<{ isMini: boolean }>`
  color: #ffffff;
  font-size: ${(props) => (props.isMini ? '1rem' : '2.5rem')};
  font-weight: bold;
  letter-spacing: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    font-size: ${(props) => (props.isMini ? '0.8rem' : '2.2rem')}
  @media (max-width: 576px) {
    font-size: ${(props) => (props.isMini ? '0.5rem' : '1.8rem')}
`;

const Subcaption = styled.p<{ isMini: boolean }>`
  color: #ffffff;
  font-size: ${(props) => (props.isMini ? '0.6rem' : '1.5rem')};
  @media (max-width: 768px) {
    font-size: ${(props) => (props.isMini ? '0.6rem' : '1rem')}
  @media (max-width: 576px) {
    font-size: ${(props) => (props.isMini ? '0.3rem' : '0.8rem')}
`;

const SmallCaption = styled.p<{ isMini: boolean }>`
  color: ${COLORS.lightGray};
  font-size: ${(props) => (props.isMini ? '0.4rem' : '1rem')};
  letter-spacing: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 0.5px solid ${COLORS.lightGray};
  @media (max-width: 768px) {
    font-size: ${(props) => (props.isMini ? '0.2rem' : '0.6rem')}
  @media (max-width: 576px) {
    font-size: ${(props) => (props.isMini ? '0.1rem' : '0.4rem')}
`;

const Slide = ({ slide, children, isMini = false }: SlideProps) => {
  return (
    <SlideContainer src={slide.coverImage || ''}>
      {children}
      <ContentContainer onClick={() => window.open(slide.link, '_blank')}>
        {slide.smallCaption && (
          <SmallCaption isMini={isMini}>{slide.smallCaption}</SmallCaption>
        )}
        <CaptionContainer>
          <Caption isMini={isMini}>{slide.caption || ''}</Caption>
          <Subcaption isMini={isMini}>{slide.subcaption || ''}</Subcaption>
        </CaptionContainer>
      </ContentContainer>
    </SlideContainer>
  );
};
export default Slide;
