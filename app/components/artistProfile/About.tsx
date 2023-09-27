'use client';

import { IArtistProfile } from '../../types';
import ProfilePicture from './ProfilePicture';
import Biography from './Biography';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import useTranslate from '../../hooks/useTranslate';
import styled from 'styled-components';
interface AboutProps {
  artistProfile: IArtistProfile;
  isEditable?: boolean;
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: row;
  width: 80%;
  gap: 2rem;
  margin: 2rem 0;
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
const About = ({ artistProfile, isEditable = false }: AboutProps) => {
  const t = useTranslate();
  const location = {
    element: 'about',
    superElement: 'artist_profile',
  };

  return (
    <ComponentWithHeading headingText={t('heading', location)}>
      <Container>
        <ProfilePicture
          artistProfile={artistProfile}
          isEditable={isEditable}
        ></ProfilePicture>
        <Biography
          artistProfile={artistProfile}
          isEditable={isEditable}
        ></Biography>
      </Container>
    </ComponentWithHeading>
  );
};

export default About;
