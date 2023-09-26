'use client';
import { IAnnouncement } from '@/app/types';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import EditMenu from '../menu/EditMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Slide from '../carousel/Slide';

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
  width: 25vw;
  height: 25vh;
  min-width: 250px;
`;
const ListContainer = styled.div<{ width: string }>`
  display: grid;
  grid-auto-rows: max-content;
  align-items: start;
  justify-items: center;
  width: ${(props) => props.width};
  margin: 2rem 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const AnnouncementsList = ({
  announcements,
  width = '100%',
  isEditable = false,
}: AnnouncementsListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    router.refresh();
  };
  const handleDeleteAnnouncement = (announcementId: string) => {
    setIsLoading(true);

    axios
      .delete(`/api/announcement/${announcementId}`)
      .then(() => {
        toast.success('Duyuru sistemden silindi!');
        refreshPage();
      })
      .catch(() => {
        toast.error('Bir şeyler yanlış gitti');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ListContainer width={width}>
      {announcements.map((announcement: IAnnouncement) => (
        <div key={announcement.id} className='flex flex-col items-end'>
          <AnnouncementContainer>
            <AnnouncementBox>
              <Slide isMini slide={announcement}></Slide>
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
