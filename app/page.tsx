import React from 'react';
import Carousel from './components/carousel/AnnouncementCarousel';
import { IAnnouncement } from './actions/type';
import getAllAnnouncements from './actions/getAllAnnouncements';

export default async function Home() {
  let announcements: IAnnouncement[] = [];
  try {
    const result = await getAllAnnouncements();
    if (result && result.announcements) {
      announcements = result.announcements;
      if (announcements.length > 0) {
        return (
          <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Carousel slides={announcements} />
          </div>
        );
      } else {
        return <></>;
      }
    } else {
      return <></>;
    }
  } catch (error) {
    console.log(error);
  }
}
