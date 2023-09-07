import React from 'react';
import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import getAllAnnouncements from '@/app/[lang]/actions/getAllAnnouncements';
import { IAnnouncement } from '@/app/[lang]/types';
import EditAnnouncementsClient from './EditAnnouncementsClient';
import { IPageProps } from '@/app/[lang]/types/common';
import { getDictionary } from '@/lib/dictionary';

const EditAnnouncementsPage = async ({ params }: { params: IPageProps }) => {
  const { editAnnouncementsPage } = await getDictionary(params.lang);
  let announcements: IAnnouncement[] = [];
  try {
    const result = await getAllAnnouncements();
    if (result && result.announcements) {
      announcements = result.announcements;
      if (announcements.length > 0) {
        return (
          <ClientOnly>
            <div className='pt-28 w-full'>
              <EditAnnouncementsClient
                announcements={announcements}
                messages={editAnnouncementsPage}
              ></EditAnnouncementsClient>
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
