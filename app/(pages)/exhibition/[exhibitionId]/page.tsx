import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import { IExhibition } from '@/app/types';
import Exhibition from '@/app/components/exhibition/Exhibition';
import getExhibitionById from '@/app/actions/exhibition/getExhibitionById';

interface IParams {
  exhibitionId?: string;
}

const ExhibitionPage = async ({ params }: { params: IParams }) => {
  let exhibition: { exhibition: IExhibition } | null = null;

  if (params != undefined && params != undefined) {
    exhibition = await getExhibitionById(params);
  }

  if (!exhibition) {
    return (
      <ClientOnly>
        <EmptyState
          title='An error occured.'
          subtitle='Looks like this exhibiton does not exist anymore.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Exhibition exhibition={exhibition.exhibition}></Exhibition>
    </ClientOnly>
  );
};

export default ExhibitionPage;
