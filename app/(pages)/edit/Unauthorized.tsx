'use client';

import Error from '../error';
import {
  AdminAuthRequiredError,
  AuthRequiredError,
} from '@/app/lib/exceptions';

type UnauthorizedProps = {
  isAdminError?: boolean;
};

export default function Unauthorized({ isAdminError }: UnauthorizedProps) {
  return (
    <Error
      error={
        isAdminError ? new AdminAuthRequiredError() : new AuthRequiredError()
      }
    ></Error>
  );
}
