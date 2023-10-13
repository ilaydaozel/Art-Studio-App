'use client';

import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import useTranslate from '@/app/hooks/useTranslate';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

const DescriptionText = styled.div`
  font-size: 1rem;
  color: ${COLORS.darkGray};
`;

const AboutClient = () => {
  const t = useTranslate();
  const location = { element: 'about' };

  return (
    <>
      <ComponentWithHeading headingText={t('heading', location)}>
        <div className='w-[80%] m-8 text-left'>
          <DescriptionText
            dangerouslySetInnerHTML={{ __html: t('about_text', location) }}
          />
        </div>
      </ComponentWithHeading>
    </>
  );
};
export default AboutClient;
