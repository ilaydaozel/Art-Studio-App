'use client';
import { IUser } from '@/app/[lang]/actions/type';
import HeadingWithUnderline from '@/app/[lang]/components/heading/HeadingWithUnderline';
import SlidingButton from '@/app/[lang]/components/buttons/SlidingButton';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import ArtistAccountsList from '@/app/[lang]/components/lists/ArtistAccountsList';

interface EditArtistAccountsClientProps {
  accounts: IUser[];
}

const EditArtistAccountsClient = ({
  accounts,
}: EditArtistAccountsClientProps) => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <div className='flex w-[80%] justify-end'>
        <SlidingButton
          label='Yeni Sanatçı Ekle +'
          onClick={() =>
            router.push(`${ROUTE_PATHS.ADD}${ROUTE_PATHS.ADD_NEW_ARTIST}`)
          }
        ></SlidingButton>
      </div>
      <HeadingWithUnderline title='Sanatçı Hesaplarını Düzenle'></HeadingWithUnderline>
      <ArtistAccountsList isEditable accounts={accounts}></ArtistAccountsList>
    </div>
  );
};
export default EditArtistAccountsClient;
