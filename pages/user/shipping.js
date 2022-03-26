import React from 'react';
import { User as UserSettings, Pages } from '../../utils/settings';
import { getSession } from 'next-auth/react';
import AddressBook from '../../components/ui/Address/AddressBookView';
import { useRouter } from 'next/router';

export default function Shipping({ session }) {
  const router = useRouter();

  function handleBack() {
    // console.log('Selected Shipping', id);
    router.back();
  }

  function handleNext(id) {
    console.log('Selected Shipping', id);
    router.push(UserSettings.billing.link);
  }

  return (
    <AddressBook
      title={'Shipping Address'}
      selectable={true}
      selectionType={'shipping'}
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
        destination: `${UserSettings.signin.link}?redirect=${UserSettings.shipping.link}`,
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
