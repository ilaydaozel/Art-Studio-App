'use client';
import { IUser } from '@/app/[lang]/actions/type';
import HeadingWithUnderline from '@/app/[lang]/components/heading/HeadingWithUnderline';
import SlidingButton from '@/app/[lang]/components/buttons/SlidingButton';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import ArtistAccountPreview from './ArtistAccountPreview';

interface ArtistAccountsListProps {
  accounts: IUser[];
}

const ArtistAccountsList = ({ accounts }: ArtistAccountsListProps) => {
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

      <div className='w-[90%] py-8 flex flex-row flex-wrap items-center justify-around'>
        {accounts.map((account: IUser) => (
          <ArtistAccountPreview
            key={account.id}
            artist={account}
          ></ArtistAccountPreview>
        ))}
      </div>
    </div>
  );
};
export default ArtistAccountsList;
