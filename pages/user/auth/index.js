import React from 'react';
import { useRouter } from 'next/router';
import AuthComponent from '../../../components/ui/Auth/Auth';
import { User } from '../../../utils/settings';

export default function Auth() {
  const router = useRouter();

  function handleAuthentication(status) {
    if (status == 'authenticated') {
      router.replace(User.auth.redirect);
    }
  }
  return <AuthComponent handleAuthentication={handleAuthentication} />;
}
