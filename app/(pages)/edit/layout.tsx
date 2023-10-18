import getCurrentUser from '@/app/actions/user/getCurrentUser';
import Unauthorized from './Unauthorized';

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
