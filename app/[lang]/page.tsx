import React from 'react';
import getAllAnnouncements from './actions/getAllAnnouncements';
import { IAnnouncement } from './actions/type';
import AnnouncementCarousel from './components/carousel/AnnouncementCarousel';
import ClientOnly from './components/ClientOnly';
import EmptyState from './components/EmptyState';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

export default async function ({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  let announcements: IAnnouncement[] = [];
  const { page } = await getDictionary(lang);
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
            <h1 className='text-3xl font-bold'>{page.home.title}</h1>
            <p className='text-gray-500'>{page.home.description}</p>
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
