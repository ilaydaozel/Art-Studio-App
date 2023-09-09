'use client';

import { IArtistProfile } from '../../types';
import ProfilePicture from './ProfilePicture';
import Biography from './Biography';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import translate from '../translation/translate';
interface AboutProps {
  artistProfile: IArtistProfile;
  isEditable?: boolean;
}

const t = (text: string): string => {
  return translate(text, {
    element: 'about',
    superElement: 'artist_profile',
  });
};

const About = ({ artistProfile, isEditable = false }: AboutProps) => {
  return (
    <ComponentWithHeading headingText={t('heading')}>
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
