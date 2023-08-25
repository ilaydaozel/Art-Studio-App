'use client';
import styled from 'styled-components';
import { IAnnouncement } from '@/app/actions/type';
import AnnouncementMenu from './AnnouncementMenu';

interface AnnouncementPreviewProps {
  announcement: IAnnouncement;
}

const AnnouncementContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin: 16px 4px;
`;

const NameText = styled.div`
  color: #fff;
  transition: color 0.2s;
  position: absolute;
  bottom: 2px;
`;

const AnnouncementBox = styled.div<{ picture: string }>`
  display: flex;
  justify-content: center;
  width: 22vw;
  height: 22vh;
  background-image: url(${(props) => props.picture});
  background-size: cover;
  background-position: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
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
    font-size: 1.2 rem;

  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const AnnouncementPreviewClient = ({
  announcement,
}: AnnouncementPreviewProps) => {
  return (
    <AnnouncementContainer>
      <AnnouncementBox
        picture={announcement.coverImage ? announcement.coverImage : ''}
      >
        <NameText>{announcement.caption}</NameText>
      </AnnouncementBox>
      <AnnouncementMenu announcement={announcement}></AnnouncementMenu>
    </AnnouncementContainer>
  );
};

export default AnnouncementPreviewClient;
