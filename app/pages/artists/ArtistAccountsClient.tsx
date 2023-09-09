'use client';

import { IUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import ArtistAccountsList from '@/app/components/lists/ArtistAccountsList';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import useTranslate from '@/app/hooks/useTranslate';

interface ArtistAccountsClientProps {
  accounts: IUser[];
}

const ArtistAccountsClient = ({ accounts }: ArtistAccountsClientProps) => {
  const location = { element: 'artist_accounts' };
  const t = useTranslate();

  return (
    <>
      <ComponentWithHeading headingText={t('list_heading', location)}>
        <ArtistAccountsList
          width='90%'
          accounts={accounts}
        ></ArtistAccountsList>
      </ComponentWithHeading>
    </>
  );
};
export default ArtistAccountsClient;
