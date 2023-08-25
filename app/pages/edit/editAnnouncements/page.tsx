import React from 'react';
import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import getAllAnnouncements from '@/app/actions/getAllAnnouncements';
import { IAnnouncement } from '@/app/actions/type';
import AnnouncementPreview from './AnnouncementPreviewClient';
import AnnouncementPreviewClient from './AnnouncementPreviewClient';
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
            <div className='pt-24 w-full'>
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
