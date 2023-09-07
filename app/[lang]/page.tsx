import React from 'react';
import getAllAnnouncements from './actions/getAllAnnouncements';
import { IAnnouncement } from './types';
import AnnouncementCarousel from './components/carousel/AnnouncementCarousel';
import ClientOnly from './components/ClientOnly';
import EmptyState from './components/EmptyState';

export default async function () {
  let announcements: IAnnouncement[] = [];
  try {
    const allAnnouncements = await getAllAnnouncements();
    if (allAnnouncements && allAnnouncements.announcements) {
      announcements = allAnnouncements.announcements;
      if (announcements.length > 0) {
        return (
          <>
            <div className='max-w-[100vw] overflow-x-hidden'>
              <AnnouncementCarousel slides={announcements} />
            </div>
          </>
        );
      } else {
        return (
          <ClientOnly>
            <EmptyState
              title='Can not load homepage'
              subtitle='Looks like there is a problem.'
            />
          </ClientOnly>
        );
      }
    } else {
      return (
        <ClientOnly>
          <EmptyState
            title='No homepage found'
            subtitle='Looks like there is a problem.'
          />
        </ClientOnly>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
