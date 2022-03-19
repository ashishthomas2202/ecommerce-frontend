import React, { useState, useEffect } from 'react';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';
import { User } from '../../utils/settings';
import { getSession } from 'next-auth/react';

export default function Shipping() {
  const router = useRouter();

  return <div>Shipping</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: `${User.signin.link}?redirect=${User.shipping.link}`,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
