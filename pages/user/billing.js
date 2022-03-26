import React from 'react';
import { User as UserSettings } from '../../utils/settings';
import { getSession } from 'next-auth/react';
import AddressBook from '../../components/ui/Address/AddressBookView';
import { useRouter } from 'next/router';

export default function Billing({ session }) {
  const router = useRouter();

  function handleBack() {
    // console.log('Selected Shipping', id);
    router.back();
  }

  function handleNext(id) {
    console.log('Selected Billing', id);
    router.push(UserSettings.payment.link);
  }

  return (
    <AddressBook
      title={'Billing Address'}
      selectable={true}
      selectionType={'billing'}
      next={handleNext}
      back={handleBack}
    />
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: `${UserSettings.signin.link}?redirect=${UserSettings.billing.link}`,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
}
