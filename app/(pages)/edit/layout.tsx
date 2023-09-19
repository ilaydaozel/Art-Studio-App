import getCurrentUser from '@/app/actions/getCurrentUser';
import Unauthorized from './Unauthorized';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const isLoggedIn = currentUser?.currentUser;
  if (!isLoggedIn) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}
