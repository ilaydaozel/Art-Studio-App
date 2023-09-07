'use client';

import styled from 'styled-components';
import { IArtistProfile } from '../../actions/type';
import ProfilePicture from './ProfilePicture';
import HeadingWithUnderline from '../heading/HeadingWithUnderline';
import Biography from './Biography';
import ComponentWithHeading from '../pageLayout/ComponentWithHeading';
interface AboutProps {
  artistProfile: IArtistProfile;
  isEditable?: boolean;
}

const InformaionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const About = ({ artistProfile, isEditable = false }: AboutProps) => {
  return (
    <ComponentWithHeading headingText='Hakkında'>
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
