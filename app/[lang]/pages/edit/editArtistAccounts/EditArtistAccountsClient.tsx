'use client';
import { IUser } from '@/app/[lang]/actions/type';
import SlidingButton from '@/app/[lang]/components/buttons/SlidingButton';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import ArtistAccountsList from '@/app/[lang]/components/lists/ArtistAccountsList';
import ListWithHeading from '@/app/[lang]/components/pageLayout/ListWithHeading';
import styled from 'styled-components';
import ListWithButton from '@/app/[lang]/components/pageLayout/ListWithButton';

interface EditArtistAccountsClientProps {
  accounts: IUser[];
}

const EditArtistAccountsClient = ({
  accounts,
}: EditArtistAccountsClientProps) => {
  const router = useRouter();

  return (
    <>
      <ListWithButton
        buttonText='Yeni Sanatçı Ekle +'
        onClick={() =>
          router.push(`${ROUTE_PATHS.ADD}${ROUTE_PATHS.ADD_NEW_ARTIST}`)
        }
      >
        <ListWithHeading headingText='Sanatçı Hesaplarını Düzenle'>
          <ArtistAccountsList
            isEditable
            accounts={accounts}
          ></ArtistAccountsList>
        </ListWithHeading>
      </ListWithButton>
    </>
  );
};
export default EditArtistAccountsClient;
