'use client';
import styled from 'styled-components';
import { IAnnouncement } from '@/app/[lang]/actions/type';
import AnnouncementMenu from './AnnouncementMenu';
import Slide from '@/app/[lang]/components/carousel/Slide';

interface AnnouncementPreviewProps {
  announcement: IAnnouncement;
}

const AnnouncementContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin: 16px 4px;
`;

const AnnouncementBox = styled.div`
  width: 22vw;
  height: 22vh;
`;

const AnnouncementPreviewClient = ({
  announcement,
}: AnnouncementPreviewProps) => {
  return (
    <AnnouncementContainer>
      <AnnouncementBox>
        <Slide slide={announcement}></Slide>
      </AnnouncementBox>
      <AnnouncementMenu announcement={announcement}></AnnouncementMenu>
    </AnnouncementContainer>
  );
};

export default AnnouncementPreviewClient;
