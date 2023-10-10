'use client';

import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import GoogleMap from '@/app/components/utils/GoogleMap';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

const DescriptionText = styled.div`
  font-size: 1rem;
  color: ${COLORS.darkGray};
`;

const AboutClient = () => {
  return (
    <>
      <ComponentWithHeading headingText={'Hakkımızda'}>
        <div className='w-[84%] text-left'>
          <DescriptionText>lorem ipsum</DescriptionText>
        </div>
      </ComponentWithHeading>
      <GoogleMap></GoogleMap>
    </>
  );
};
export default AboutClient;
