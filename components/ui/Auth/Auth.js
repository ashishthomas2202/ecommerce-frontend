import React, { useState } from 'react';
import { ViewSelector, View } from '../Basic/View/View';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Auth({ handleAuthentication }) {
  const views = {
    signup: 'signup',
    signin: 'signin',
  };
  const [select, setSelect] = useState(views.signin);

  return (
    <ViewSelector select={select}>
      <View name={views.signin}>
        <SignIn
          signup={() => {
            setSelect(views.signup);
          }}
          authenticate={() => {
            handleAuthentication('authenticated');
          }}
        />
      </View>
      <View name={views.signup}>
        <SignUp
          signin={() => {
            setSelect(views.signin);
          }}
        />
      </View>
    </ViewSelector>
  );
}
