'use client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { COLORS } from '@/constants/colors';
import { IAnnouncement } from '@/app/actions/type';
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
  transition: background-image 0.8s ease;

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
  position: relative;
  background-position: center;
  top: 50%;
`;

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Caption = styled.p`
  color: #fff;
  font-size: 3rem;
`;

const Subcaption = styled.p`
  color: #fff;
  font-size: 1.8rem;
`;

const LinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.2rem 1rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.5s;
  color: white;
  border: solid 1px white;
  width: fit-content;
  &:hover {
    transform: translateY(0.5rem);
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
    <SlideContainer
      onClick={() => {
        if (activeSlideLink) {
          router.push(activeSlideLink);
        }
      }}
      src={slides[activeIndex].coverImage || ''}
    >
      <NavButtonLeft onClick={goToPrevSlide}>
        <FaChevronLeft />
      </NavButtonLeft>
      <ContentContainer>
        <CaptionContainer>
          <Caption>{slides[activeIndex].caption || ''}</Caption>
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
