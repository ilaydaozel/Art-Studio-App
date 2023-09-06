'use client';
import { IAnnouncement } from '@/app/[lang]/actions/type';
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
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 5rem 0;
  width: ${(props) => props.width};
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
