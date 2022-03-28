import React, { useState, useEffect } from 'react';
import { ViewSelector, View } from '../components/ui/Basic/View/View';
import ProtectedRoute from '../components/ui/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/router';
import Loading from '../components/ui/Loading/Loading';
import Shipping from '../components/ui/Checkout/Shipping';
import Billing from '../components/ui/Checkout/Billing';

// import Billing from '../components/ui/Checkout/billing';
import Payment from '../components/ui/Checkout/Payment';
import Checkout from '../components/ui/Checkout/Checkout';
export default function CheckoutPage() {
  const router = useRouter();

  const views = {
    shipping: 'shipping',
    billing: 'billing',
    payment: 'payment',
    checkout: 'checkout',
    loading: 'Loading',
  };

  const [select, setSelect] = useState(views.loading);

  useEffect(() => {
    let defaultView = views.shipping;

    if (
      router.query &&
      router.query.type &&
      Object.values(views).indexOf(router.query.type) > -1
    ) {
      defaultView = router.query.type;
    }
    setSelect(defaultView);
  }, [router.query]);

  function handleBack() {
    console.log(select, 'Back');
  }
  function handleNext() {
    console.log(select, 'Next');
  }
  //   useEffect(() => {}, [select]);
  return (
    <ProtectedRoute>
      <button
        onClick={() => {
          console.log(router.query.type);
          router.push(
            {
              pathname: '/checkout/',
              query: { type: 'shipping' },
            },
            undefined,
            { shallow: true }
          );
          setSelect(views.shipping);
        }}
      >
        Shipping
      </button>
      <button
        onClick={() => {
          router.push(
            {
              pathname: '/checkout/',
              query: { type: 'billing' },
            },
            undefined,
            { shallow: true }
          );
          setSelect(views.billing);
        }}
      >
        Billing
      </button>
      <button
        onClick={() => {
          router.push(
            {
              pathname: '/checkout/',
              query: { type: 'payment' },
            },
            undefined,
            { shallow: true }
          );
          setSelect(views.payment);
        }}
      >
        Payment
      </button>
      <button
        onClick={() => {
          router.push(
            {
              pathname: '/checkout/',
              query: { type: 'checkout' },
            },
            undefined,
            { shallow: true }
          );
          setSelect(views.checkout);
        }}
      >
        Checkout
      </button>
      <ViewSelector select={select}>
        <View name={views.shipping}>
          <Shipping back={handleBack} next={handleNext} />
        </View>
        <View name={views.billing}>
          <Billing back={handleBack} next={handleNext} />
        </View>
        <View name={views.payment}>
          <Payment back={handleBack} next={handleNext} />
        </View>
        <View name={views.checkout}>
          <Checkout back={handleBack} next={handleNext} />
        </View>
        <View name={views.loading}>
          <Loading />
        </View>
      </ViewSelector>
    </ProtectedRoute>
  );
}
