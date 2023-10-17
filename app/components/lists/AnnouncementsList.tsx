'use client';
import { IAnnouncement } from '@/app/types';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import EditMenu from '../menu/EditMenu';
import axios from 'axios';
import { useState } from 'react';
import Slide from '../carousel/Slide';
import { handleApiResponse } from '../utils/Helper';
import useTranslate from '@/app/hooks/useTranslate';

interface AnnouncementsListProps {
  announcements: IAnnouncement[];
  width?: string;
  isEditable?: boolean;
}
const AnnouncementContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin: 16px 4px;
`;
const AnnouncementBox = styled.div`
  width: 80vw;
`;
const ListContainer = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;
const AnnouncementsList = ({
  announcements,
  width = '100%',
  isEditable = false,
}: AnnouncementsListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslate();
  const location = { element: 'edit_announcements' };

  const handleDeleteAnnouncement = async (announcementId: string) => {
    await handleApiResponse(
      axios.delete(`/api/announcement/${announcementId}`),
      setIsLoading,
      t,
      router,
      t('delete_successful_message', location)
    );
  };

  return (
    <ListContainer width={width}>
      {announcements.map((announcement: IAnnouncement) => (
        <div key={announcement.id} className='flex flex-col items-end'>
          <AnnouncementContainer>
            <AnnouncementBox>
              <Slide slide={announcement}></Slide>
            </AnnouncementBox>
            {isEditable ? (
              <EditMenu
                onDeleteClick={() => handleDeleteAnnouncement(announcement.id)}
              ></EditMenu>
            ) : (
              <></>
            )}
          </AnnouncementContainer>
        </div>
      ))}
    </ListContainer>
  );
};
export default AnnouncementsList;
