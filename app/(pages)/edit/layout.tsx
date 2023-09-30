import getCurrentUser from '@/app/actions/user/getCurrentUser';
import Unauthorized from './Unauthorized';
import { AuthRequiredError } from '@/app/lib/exceptions';
import Error from '../error';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const user = currentUser?.currentUser;
  if (!user) {
    return <Unauthorized />;
  }
  return <>{children}</>;
}
