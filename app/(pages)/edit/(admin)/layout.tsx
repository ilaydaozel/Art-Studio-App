import getCurrentUser from '@/app/actions/user/getCurrentUser';
import Unauthorized from '../Unauthorized';
import { AdminAuthRequiredError } from '@/app/lib/exceptions';
import Error from '../../error';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const user = currentUser?.currentUser;
  const isAdmin: boolean = user?.userType === 'admin';
  if (!isAdmin) {
    return <Unauthorized isAdminError={true} />;
  }

  return <>{children}</>;
}
