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
  const useT = (text: string): string => {
    return useTranslate(text, {
      element: 'artist_accounts',
    });
  };
  return (
    <>
      <ComponentWithHeading headingText={useT('list_heading')}>
        <ArtistAccountsList
          width='90%'
          accounts={accounts}
        ></ArtistAccountsList>
      </ComponentWithHeading>
    </>
  );
};
export default ArtistAccountsClient;
