import React from 'react';
import { useRouter } from 'next/router';

export default function Shipping() {
  const router = useRouter();

  router.push('/user/login');
  return <div>shipping</div>;
}
