import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IAnnouncement } from '@/app/types';
import Image from 'next/image';
interface SlideProps {
  slide: IAnnouncement;
  children?: React.ReactNode;
}

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

const Caption = styled.p`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    font-size:2.2rem;
  @media (max-width: 576px) {
    font-size: 0.5rem;
`;

const Subcaption = styled.p`
  color: #ffffff;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 0.6rem;
  @media (max-width: 576px) {
    font-size: 0.3rem;
`;

const SmallCaption = styled.p`
  color: ${COLORS.lightGray};
  font-size: 1rem;
  letter-spacing: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 0.5px solid ${COLORS.lightGray};
  @media (max-width: 768px) {
    font-size: 0.6rem;
  @media (max-width: 576px) {
    font-size: 0.4rem;
`;

const Slide = ({ slide, children }: SlideProps) => {
  return (
    <div className='w-[100%] h-[100vh] relative'>
      <Image
        src={slide.coverImage || '/images/blurImage.jpg'}
        alt={'Slide image'}
        fill
        quality={80}
        sizes={'100vw'}
        priority={true}
        placeholder='blur'
        blurDataURL={'/images/blurImage.jpg'}
        style={{
          objectFit: 'cover',
        }}
        className='brightness-75'
      />
      {children}
      <ContentContainer onClick={() => window.open(slide.link, '_blank')}>
        {slide.smallCaption && (
          <SmallCaption>{slide.smallCaption}</SmallCaption>
        )}
        <CaptionContainer>
          <Caption>{slide.caption || ''}</Caption>
          <Subcaption>{slide.subcaption || ''}</Subcaption>
        </CaptionContainer>
      </ContentContainer>
    </div>
  );
};
export default Slide;
