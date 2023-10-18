import ClientOnly from '@/app/components/ClientOnly';
import { IExhibition, IUser } from '@/app/types';
import getAllExhibitions from '@/app/actions/exhibition/getAllExhibitions';
import EditExhibitionsClient from './EditExhibitionsClient';

const ExhibitionsPage = async () => {
  let exhibitons: IExhibition[] | null = null;
  try {
    const response = await getAllExhibitions();
    if (response.exhibitons) {
      exhibitons = response.exhibitons;
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
  } catch (error: any) {
    throw new Error(error);
  }
};

export default ExhibitionsPage;
