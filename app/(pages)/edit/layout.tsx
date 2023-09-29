import getCurrentUser from '@/app/actions/user/getCurrentUser';
import { AuthRequiredError } from '@/app/lib/exceptions';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const user = currentUser?.currentUser;
  if (!user) {
    throw new AuthRequiredError();
  }
  return <>{children}</>;
}
