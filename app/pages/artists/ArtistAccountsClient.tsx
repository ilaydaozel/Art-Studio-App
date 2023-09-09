'use client';

import { IUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import ArtistAccountsList from '@/app/components/lists/ArtistAccountsList';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import translate from '@/app/components/translation/translate';

interface ArtistAccountsClientProps {
  accounts: IUser[];
}

const t = (text: string): string => {
  return translate(text, {
    element: 'artist_accounts',
  });
};

const ArtistAccountsClient = ({ accounts }: ArtistAccountsClientProps) => {
  return (
    <>
      <ComponentWithHeading headingText={t('list_heading')}>
        <ArtistAccountsList
          width='90%'
          accounts={accounts}
        ></ArtistAccountsList>
      </ComponentWithHeading>
    </>
  );
};
export default ArtistAccountsClient;
