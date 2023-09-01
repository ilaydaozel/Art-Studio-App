import getAllExhibitions from '@/app/actions/getAllExhibitions';
import { IExhibition } from '@/app/actions/type';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

interface IParams {
  exhibitionId?: string;
}

const VirtualExhibition = async ({ params }: { params: IParams }) => {};

export default VirtualExhibition;
