'use client';
import styled from 'styled-components';
import { IAnnouncement } from '@/app/actions/type';

interface AnnouncementPreviewProps {
  announcement: IAnnouncement;
}

const NameText = styled.div`
  color: #fff;
  transition: color 0.2s;
  position: absolute;
  bottom: 2px;
`;

const AnnouncementBox = styled.div<{ picture: string }>`
  display: flex;
  justify-content: center;
  width: 24vw;
  height: 24vh;
  background-image: url(${(props) => props.picture});
  background-size: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
  position: relative;
  font-size: 1rem;
  transition: font-size 0.2s background-color:0.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s;
  }

  &:hover::before {
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
    font-size: 1.2 rem;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    font-size: 1rem;
  }
`;

const AnnouncementPreviewClient = ({
  announcement,
}: AnnouncementPreviewProps) => {
  return (
    <AnnouncementBox
      picture={announcement.coverImage ? announcement.coverImage : ''}
    >
      <NameText>{announcement.caption}</NameText>
    </AnnouncementBox>
  );
};

export default AnnouncementPreviewClient;
