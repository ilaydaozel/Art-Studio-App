import React from 'react';
import getAllAnnouncements from '../actions/announcement/getAllAnnouncements';
import AnnouncementCarousel from '../components/carousel/AnnouncementCarousel';
import { IAnnouncement } from '../types';

export default async function () {
  let announcements: IAnnouncement[];
  try {
    const response = await getAllAnnouncements();
    if (response.announcements) {
      announcements = response.announcements;
      return (
        <>
          <div className='max-w-[100vw] overflow-x-hidden'>
            <AnnouncementCarousel slides={announcements} />
          </div>
        </>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
