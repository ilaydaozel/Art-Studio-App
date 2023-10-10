'use client';

import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import useTranslate from '@/app/hooks/useTranslate';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

const DescriptionText = styled.p`
  font-size: 1rem;
  color: ${COLORS.darkGray};
`;

const AboutClient = () => {
  const t = useTranslate();
  const location = { element: 'about' };
  const aboutText = t('about_text', location)
    .split('<br />')
    .map((item, key) => (
      <p key={key}>
        {item}
        <br />
        <br />
      </p>
    ));

  return (
    <>
      <ComponentWithHeading headingText={t('heading', location)}>
        <div className='w-[80%] m-8 text-left'>
          <DescriptionText>{aboutText}</DescriptionText>
        </div>
      </ComponentWithHeading>
    </>
  );
};
export default AboutClient;
