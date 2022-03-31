import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import Auth from '../Auth/Auth';
import { ViewSelector, View } from '../Basic/View/View';
import Loading from '../Loading/Loading';
export default function ProtectedRoutes({ children }) {
  const views = {
    auth: 'auth',
    loading: 'loading',
    success: 'success',
  };

  const [select, setSelect] = useState(views.loading);

  useEffect(async () => {
    getSession().then((session) => {
      if (session) {
        setSelect(views.success);
      } else {
        setSelect(views.auth);
      }
    });
  }, [select]);

  function getAuthStatus(status) {
    if (status == 'authenticated') {
      setSelect(views.success);
    }
  }

  return (
    <ViewSelector select={select}>
      <View name={views.auth}>
        <Auth handleAuthentication={(value) => getAuthStatus(value)} />
      </View>
      <View name={views.loading}>
        <Loading />
      </View>
      <View name={views.success}>{children}</View>
    </ViewSelector>
  );
}
