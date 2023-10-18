import ClientOnly from '@/app/components/ClientOnly';
import { IExhibition } from '@/app/types';
import getAllExhibitions from '@/app/actions/exhibition/getAllExhibitions';
import ExhibitionsClient from './ExhibitionsClient';

const ExhibitionsPage = async () => {
  let exhibitons: IExhibition[];
  try {
    const response = await getAllExhibitions();
    if (response.exhibitons) {
      exhibitons = response.exhibitons;
      return (
        <ClientOnly>
          <div className='pt-28 w-full'>
            <ExhibitionsClient exhibitions={exhibitons}></ExhibitionsClient>
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default ExhibitionsPage;
