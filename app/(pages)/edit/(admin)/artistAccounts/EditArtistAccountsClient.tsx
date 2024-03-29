'use client';

import { IUser } from '@/app/types';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import ArtistAccountsList from '@/app/components/lists/ArtistAccountsList';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/components/layouts/ListWithButton';
import useTranslate from '@/app/hooks/useTranslate';
import EmptyState from '@/app/components/EmptyState';
interface EditArtistAccountsClientProps {
  accounts: IUser[];
}

const EditArtistAccountsClient = ({
  accounts,
}: EditArtistAccountsClientProps) => {
  const router = useRouter();

  const location = { element: 'artist_accounts' };
  const t = useTranslate();

  return (
    <>
      <ListWithButton
        buttonText={t('add_button_text', location)}
        onClick={() => router.push(`${ROUTE_PATHS.REGISTER}`)}
      >
        <ComponentWithHeading headingText={t('list_heading', location)}>
          {accounts.length > 0 ? (
            <ArtistAccountsList
              isEditable
              accounts={accounts}
            ></ArtistAccountsList>
          ) : (
            <EmptyState item='artistAccounts'></EmptyState>
          )}
        </ComponentWithHeading>
      </ListWithButton>
    </>
  );
};
export default EditArtistAccountsClient;
