import getCurrentUser from '@/app/actions/user/getCurrentUser';
import { AdminAuthRequiredError } from '@/app/lib/exceptions';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const user = currentUser?.currentUser;
  const isAdmin: boolean = user?.userType === 'admin';
  if (!isAdmin) {
    throw new AdminAuthRequiredError();
  }

  return <>{children}</>;
}
