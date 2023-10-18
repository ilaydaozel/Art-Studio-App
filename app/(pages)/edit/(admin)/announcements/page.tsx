import React from 'react';
import ClientOnly from '@/app/components/ClientOnly';
import getAllAnnouncements from '@/app/actions/announcement/getAllAnnouncements';
import { IAnnouncement } from '@/app/types';
import EditAnnouncementsClient from './EditAnnouncementsClient';

const EditAnnouncementsPage = async () => {
  let announcements: IAnnouncement[] = [];
  try {
    const result = await getAllAnnouncements();
    if (result.announcements) {
      announcements = result.announcements;
      return (
        <ClientOnly>
          <div className='pt-28 w-full'>
            <EditAnnouncementsClient
              announcements={announcements}
            ></EditAnnouncementsClient>
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default EditAnnouncementsPage;
