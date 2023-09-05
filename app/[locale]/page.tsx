import React from 'react';
import { IAnnouncement, IUserArtwork } from '../actions/type';
import getAllAnnouncements from '../actions/getAllAnnouncements';
import AnnouncementCarousel from '../components/carousel/AnnouncementCarousel';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import AlertMessage from './AlertMessage';

export default async function Home() {
  let announcements: IAnnouncement[] = [];

  try {
    const allAnnouncements = await getAllAnnouncements();
    if (allAnnouncements && allAnnouncements.announcements) {
      announcements = allAnnouncements.announcements;
      if (announcements.length > 0) {
        return (
          <>
            <ProfileContent announcements={announcements} />
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

function ProfileContent({ announcements }: { announcements: IAnnouncement[] }) {
  const t = useTranslations('Index');
  return (
    <>
      <div className='max-w-[100vw] overflow-x-hidden'>
        <AnnouncementCarousel slides={announcements} />
      </div>
      <h1 className='m-4'>{t('title')}</h1>
      <AlertMessage message={t('alertMessage')}></AlertMessage>
    </>
  );
}
