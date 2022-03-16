import React, { useContext, useEffect } from 'react';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';
import { User } from '../../utils/settings';

export default function Shipping() {
  const router = useRouter();

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push(`${User.login.link}?redirect=${User.shipping.link}`);
    }
  });
  return <div>shipping</div>;
}
