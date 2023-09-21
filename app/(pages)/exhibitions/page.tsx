import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import { IExhibition, IUser } from '@/app/types';
import getAllExhibitions from '@/app/actions/exhibition/getAllExhibitions';
import ExhibitionsClient from './ExhibitionsClient';

const ExhibitionsPage = async () => {
  let exhibitons: IExhibition[] | null = null;
  try {
    const result = await getAllExhibitions();
    if (result && result.exhibitons) {
      exhibitons = result.exhibitons;
      if (exhibitons.length > 0) {
        return (
          <ClientOnly>
            <div className='pt-28 w-full'>
              <ExhibitionsClient exhibitions={exhibitons}></ExhibitionsClient>
            </div>
          </ClientOnly>
        );
      } else {
        return (
          <ClientOnly>
            <EmptyState
              title='No exhibitons found'
              subtitle='Looks like you have no exhibitons.'
            />
          </ClientOnly>
        );
      }
    } else {
      return (
        <ClientOnly>
          <EmptyState
            title='An error occured.'
            subtitle='Looks like you have no exhibitons.'
          />
        </ClientOnly>
      );
    }
  } catch (error) {
    return (
      <ClientOnly>
        <EmptyState
          title='An error occured.'
          subtitle='Looks like you have no exhibitons.'
        />
      </ClientOnly>
    );
  }
};

export default ExhibitionsPage;
