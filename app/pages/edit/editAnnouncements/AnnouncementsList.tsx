import { IAnnouncement } from '@/app/actions/type';
import AnnouncementPreviewClient from './AnnouncementPreviewClient';
import HeadingWithUnderline from '@/app/components/HeadingWithUnderline';

interface AnnouncementsListProps {
  announcements: IAnnouncement[];
}

const AnnouncementsList = ({ announcements }: AnnouncementsListProps) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <HeadingWithUnderline title={'Duyuruları Düzenle'}></HeadingWithUnderline>
      <div className='w-[80%] flex flex-row flex-wrap items-center justify-between'>
        {announcements.map((announcement: IAnnouncement) => (
          <AnnouncementPreviewClient
            announcement={announcement}
          ></AnnouncementPreviewClient>
        ))}
      </div>
    </div>
  );
};
export default AnnouncementsList;
