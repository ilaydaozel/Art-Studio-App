import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IAnnouncement } from '@/app/[lang]/actions/type';

interface SlideProps {
  slide: IAnnouncement;
  children: React.ReactNode;
}

const SlideContainer = styled.div<{ src: string }>`
  position: relative;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  transition: background-image 0.4s ease-in-out;

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
  @media (max-width: 768px) {
    gap: 2.4rem;
  }
`;

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Caption = styled.p`
  color: #ffffff;
  font-size: 2.6rem;
  font-weight: bold;
  letter-spacing: 3px;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subcaption = styled.p`
  color: #ffffff;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const SmallCaption = styled.p`
  color: ${COLORS.lightGray};
  font-size: 0.8rem;
  letter-spacing: 2px;
  border-bottom: 0.5px solid ${COLORS.lightGray};
  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.4rem;
  }
`;

const Slide = ({ slide, children }: SlideProps) => {
  return (
    <SlideContainer src={slide.coverImage || ''}>
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
    </SlideContainer>
  );
};
export default Slide;
