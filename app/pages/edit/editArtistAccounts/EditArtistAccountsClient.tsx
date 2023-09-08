'use client';

import { IUser } from '@/app/types';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import ArtistAccountsList from '@/app/components/lists/ArtistAccountsList';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/components/layouts/ListWithButton';
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
        buttonText={messages.add_button_text}
        onClick={() =>
          router.push(`${ROUTE_PATHS.ADD}${ROUTE_PATHS.ADD_NEW_ARTIST}`)
        }
      >
        <ComponentWithHeading headingText={messages.list_heading}>
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
