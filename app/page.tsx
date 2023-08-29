import React from 'react';
import Carousel from './components/carousel/AnnouncementCarousel';
import { IAnnouncement } from './actions/type';
import getAllAnnouncements from './actions/getAllAnnouncements';
import ThreeScene from './components/virtualExhibition/ThreeScene';
import HeadingWithUnderline from './components/HeadingWithUnderline';

export default async function Home() {
  let announcements: IAnnouncement[] = [];
  try {
    const result = await getAllAnnouncements();
    if (result && result.announcements) {
      announcements = result.announcements;
      if (announcements.length > 0) {
        return (
          <>
            <div className='max-w-[100vw] overflow-x-hidden'>
              <Carousel slides={announcements} />
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
              <HeadingWithUnderline title='Sanal Sergi'></HeadingWithUnderline>
              <div className='max-w-[80vw] overflow-x-hidden m-8'>
                <ThreeScene></ThreeScene>
              </div>
            </div>
          </>
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
