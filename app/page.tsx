import React from 'react';
import Carousel from './components/carousel/AnnouncementCarousel';
import { IAnnouncement, IUserArtwork } from './actions/type';
import getAllAnnouncements from './actions/getAllAnnouncements';
import getAllArtworks from './actions/getAllArtworks';
import ClientOnly from './components/ClientOnly';
import EmptyState from './components/EmptyState';

export default async function Home() {
  let announcements: IAnnouncement[] = [];
  let artworks: IUserArtwork[] = [];
  try {
    const allAnnouncements = await getAllAnnouncements();
    const allArtworks = await getAllArtworks();
    if (allArtworks) {
      artworks = allArtworks.artworks;
    }
    if (allAnnouncements && allAnnouncements.announcements) {
      announcements = allAnnouncements.announcements;
      if (announcements.length > 0) {
        return (
          <>
            <div className='max-w-[100vw] overflow-x-hidden'>
              <Carousel slides={announcements} />
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
