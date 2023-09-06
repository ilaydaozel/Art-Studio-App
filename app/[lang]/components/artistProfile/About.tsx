'use client';

import styled from 'styled-components';
import { IArtistProfile } from '../../actions/type';
import ProfilePicture from './ProfilePicture';
import HeadingWithUnderline from '../heading/HeadingWithUnderline';
import Biography from './Biography';

const InformaionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface AboutProps {
  artistProfile: IArtistProfile;
  isEditable: boolean;
}

const About = ({ artistProfile, isEditable = false }: AboutProps) => {
  return (
    <>
      <InformaionContainer>
        <HeadingWithUnderline title='Hakkında'></HeadingWithUnderline>
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
      </InformaionContainer>
    </>
  );
};

export default About;
