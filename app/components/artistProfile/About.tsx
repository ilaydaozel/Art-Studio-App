'use client';

import { IArtistProfile } from '../../types';
import ProfilePicture from './ProfilePicture';
import Biography from './Biography';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import useTranslate from '../../hooks/useTranslate';
interface AboutProps {
  artistProfile: IArtistProfile;
  isEditable?: boolean;
}

const About = ({ artistProfile, isEditable = false }: AboutProps) => {
  const t = useTranslate();
  const location = {
    element: 'about',
    superElement: 'artist_profile',
  };

  return (
    <ComponentWithHeading headingText={t('heading', location)}>
      <div className='flex items-center justify-center w-[80%] my-10 gap-10'>
        <ProfilePicture
          artistProfile={artistProfile}
          isEditable={isEditable}
        ></ProfilePicture>
        <Biography
          artistProfile={artistProfile}
          isEditable={isEditable}
        ></Biography>
      </div>
    </ComponentWithHeading>
  );
};

export default About;
