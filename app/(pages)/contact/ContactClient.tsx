'use client';

import GoogleMapsWidget from '@/app/components/utils/GoogleMapsWidget';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

const ContactClient = () => {
  return (
    <Container>
      <GoogleMapsWidget />
    </Container>
  );
};
export default ContactClient;
