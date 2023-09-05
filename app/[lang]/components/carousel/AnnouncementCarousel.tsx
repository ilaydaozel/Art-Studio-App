'use client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { COLORS } from '@/constants/colors';
import { IAnnouncement } from '@/app/[lang]/actions/type';
import { useRouter } from 'next/navigation';

interface AnnouncementCarouselProps {
  slides: IAnnouncement[];
}

const SlideContainer = styled.div<{ src: string }>`
  position: relative;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  transition: background-image 0.4s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;
  background-position: center;
  top: 34%;
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
  word-break: break-all;
`;

const Caption = styled.p`
  color: #fff;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 3px;
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subcaption = styled.p`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1.8rem;
  @media (max-width: 768px) {
    font-size: 1.4rem;
    line-height: 1.4rem;
  }
`;

const SmallCaption = styled.p`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 400;
  padding: 0 1rem;
  letter-spacing: 2px;
  border-bottom: 1px solid ${COLORS.lightGray};
  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.4rem;
  }
`;

const LinkButton = styled.button`
  padding: 4px 40px;
  margin: 10px;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.5s;
  color: white;
  border: solid 1px white;
  width: fit-content;
  &:hover {
    transform: translateY(0.5rem);
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 2px 20px;
  }
  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 2px 10px;
  }
`;

const NavButtonRight = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: ${COLORS.gray};
  font-size: 24px;
  right: 0;
`;

const NavButtonLeft = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: ${COLORS.gray};
  font-size: 24px;
  left: 0;
`;
const AnnouncementCarousel = ({ slides }: AnnouncementCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const activeSlideLink = slides[activeIndex].link;

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  return (
    <SlideContainer src={slides[activeIndex].coverImage || ''}>
      <NavButtonLeft onClick={goToPrevSlide}>
        <FaChevronLeft />
      </NavButtonLeft>
      <ContentContainer>
        {slides[activeIndex].smallCaption && (
          <SmallCaption>{slides[activeIndex].smallCaption}</SmallCaption>
        )}

        <CaptionContainer>
          <Caption>
            {slides[activeIndex].caption.toLocaleUpperCase('TR') || ''}
          </Caption>
          <Subcaption>{slides[activeIndex].subcaption || ''}</Subcaption>
        </CaptionContainer>
        {activeSlideLink && (
          <LinkButton onClick={() => window.open(activeSlideLink, '_blank')}>
            KEŞFET
          </LinkButton>
        )}
      </ContentContainer>

      <NavButtonRight onClick={goToNextSlide}>
        <FaChevronRight />
      </NavButtonRight>
    </SlideContainer>
  );
};

export default AnnouncementCarousel;
