import React from 'react';
import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import getAllAnnouncements from '@/app/[lang]/actions/getAllAnnouncements';
import { IAnnouncement } from '@/app/[lang]/actions/type';
import AnnouncementsList from './AnnouncementsList';

const EditAnnouncementsPage = async () => {
  let announcements: IAnnouncement[] = [];

  try {
    const result = await getAllAnnouncements();
    if (result && result.announcements) {
      announcements = result.announcements;
      if (announcements.length > 0) {
        return (
          <ClientOnly>
            <div className='pt-28 w-full'>
              <AnnouncementsList
                announcements={announcements}
              ></AnnouncementsList>
            </div>
          </ClientOnly>
        );
      } else {
        return (
          <ClientOnly>
            <EmptyState
              title='No artists found'
              subtitle='Looks like you have no artists.'
            />
          </ClientOnly>
        );
      }
    } else {
      return (
        <ClientOnly>
          <EmptyState
            title='An error occured.'
            subtitle='Looks like you have no artists.'
          />
        </ClientOnly>
      );
    }
  } catch (error) {
    return (
      <ClientOnly>
        <EmptyState
          title='An error occured.'
          subtitle='Looks like you have no artists.'
        />
      </ClientOnly>
    );
  }
};

export default EditAnnouncementsPage;
