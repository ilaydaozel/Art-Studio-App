'use client';

import { IArtistProfile } from '../../types';
import ProfilePicture from './ProfilePicture';
import Biography from './Biography';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
interface AboutProps {
  artistProfile: IArtistProfile;
  isEditable?: boolean;
  messages: any;
}

const About = ({ artistProfile, isEditable = false, messages }: AboutProps) => {
  return (
    <ComponentWithHeading headingText={messages.heading}>
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
