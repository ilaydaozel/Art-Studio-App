'use client';

import { IUser } from '@/app/[lang]/types';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import ArtistAccountsList from '@/app/[lang]/components/lists/ArtistAccountsList';
import ComponentWithHeading from '@/app/[lang]/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/[lang]/components/layouts/ListWithButton';
interface EditArtistAccountsClientProps {
  accounts: IUser[];
  messages: any;
}

const EditArtistAccountsClient = ({
  accounts,
  messages,
}: EditArtistAccountsClientProps) => {
  const router = useRouter();

  return (
    <>
      <ListWithButton
        buttonText={messages.addButtonText}
        onClick={() =>
          router.push(`${ROUTE_PATHS.ADD}${ROUTE_PATHS.ADD_NEW_ARTIST}`)
        }
      >
        <ComponentWithHeading headingText={messages.listHeading}>
          <ArtistAccountsList
            isEditable
            accounts={accounts}
          ></ArtistAccountsList>
        </ComponentWithHeading>
      </ListWithButton>
    </>
  );
};
export default EditArtistAccountsClient;
