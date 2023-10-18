'use client';

import { IUser } from '@/app/types';
import ArtistAccountsList from '@/app/components/lists/ArtistAccountsList';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import useTranslate from '@/app/hooks/useTranslate';
import EmptyState from '@/app/components/EmptyState';

interface ArtistAccountsClientProps {
  accounts: IUser[];
}

const ArtistAccountsClient = ({ accounts }: ArtistAccountsClientProps) => {
  const location = { element: 'artist_accounts' };
  const t = useTranslate();

  return (
    <>
      <ComponentWithHeading headingText={t('list_heading', location)}>
        {accounts.length > 0 ? (
          <ArtistAccountsList
            width='90%'
            accounts={accounts}
          ></ArtistAccountsList>
        ) : (
          <EmptyState item='artistAccounts'></EmptyState>
        )}
      </ComponentWithHeading>
    </>
  );
};
export default ArtistAccountsClient;
