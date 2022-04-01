import React, { useState, useEffect } from 'react';
import { ViewSelector, View } from '../../components/ui/Basic/View/View';
import ProtectedRoute from '../../components/ui/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/router';
import Loading from '../../components/ui/Loading/Loading';
import Shipping from '../../components/ui/Checkout/Shipping';
import Billing from '../../components/ui/Checkout/Billing';
import Payment from '../../components/ui/Checkout/Payment';
import Checkout from '../../components/ui/Checkout/Checkout';
import { Checkout as CheckoutSettings } from '../../utils/settings';

export default function CheckoutPage() {
  const router = useRouter();

  const views = {
    loading: 'Loading',
    shipping: 'shipping',
    billing: 'billing',
    payment: 'payment',
    checkout: 'checkout',
  };

  const [select, setSelect] = useState(views.loading);

  useEffect(() => {
    console.log('query:', router.query.type);
    let defaultView = views.shipping;
    if (
      router.query &&
      router.query.type &&
      Object.values(views).indexOf(router.query.type) > -1
    ) {
      defaultView = router.query.type;
    } else {
      router.replace(
        {
          pathname: router.pathname,
          query: { type: defaultView },
        },
        undefined,
        { shallow: true }
      );
    }
    setSelect(defaultView);
  }, [router.query]);

  function handleBack() {
    let currentPageIndex = Object.values(views).indexOf(select);
    if (currentPageIndex == 1) {
      router.back();
    } else {
      router.back();
      setSelect(Object.keys(views)[currentPageIndex - 1]);
    }
  }

  function handleNext() {
    let currentPageIndex = Object.values(views).indexOf(select);

    if (currentPageIndex == Object.keys(views).length - 1) {
      router.replace(CheckoutSettings.redirect);
    } else {
      setSelect(Object.keys(views)[currentPageIndex + 1]);
      router.push(
        {
          pathname: router.pathname,
          query: { type: Object.keys(views)[currentPageIndex + 1] },
        },
        undefined,
        { shallow: true }
      );
    }
  }
  return (
    <ProtectedRoute>
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
