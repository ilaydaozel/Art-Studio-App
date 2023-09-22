import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import { IExhibition, IUser } from '@/app/types';
import getAllExhibitions from '@/app/actions/exhibition/getAllExhibitions';
import EditExhibitionsClient from './EditExhibitionsClient';

const ExhibitionsPage = async () => {
  let exhibitons: IExhibition[] | null = null;
  try {
    const result = await getAllExhibitions();
    if (result && result.exhibitons) {
      exhibitons = result.exhibitons;
      return (
        <ClientOnly>
          <div className='pt-28 w-full'>
            <EditExhibitionsClient
              exhibitions={exhibitons}
            ></EditExhibitionsClient>
          </div>
        </ClientOnly>
      );
    }
  } catch (error) {
    return (
      <ClientOnly>
        <EmptyState title='An error occured.' />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <EmptyState title='An error occured.' />
    </ClientOnly>
  );
};

export default ExhibitionsPage;
