import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Basic/Input/Input';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';
import { User } from '../../utils/settings';
import axios from 'axios';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { redirect } = router.query; // signin?redirect=/shipping

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  if (!redirect && userInfo) {
    router.push(User.signin.redirect);
  }

  const onSubmit = async (formData) => {
    try {
      let { userId, username, email, password } = formData;
      let fields = { password };

      if (User.username && User.email) {
        fields['userId'] = userId;
      } else if (User.username && !User.email) {
        fields['username'] = username;
      } else if (!User.username && User.email) {
        fields['email'] = email;
      }

      const { data } = await axios.post('/api/user/signin', fields);

      dispatch({
        type: 'USER_SIGNIN',
        payload: data,
      });
      router.push(redirect || User.signin.redirect);
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        {User.username && User.email ? (
          <Input
            label={'Username or Email'}
            customName={'userId'}
            register={register}
            errors={errors}
            required
            minLength={6}
          />
        ) : null}

        {User.username && !User.email ? (
          <Input
            label={'Username'}
            register={register}
            errors={errors}
            required
            minLength={6}
          />
        ) : null}

        {!User.username && User.email ? (
          <Input
            label={'Email'}
            register={register}
            errors={errors}
            required
            pattern={
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
          />
        ) : null}

        <Input
          type={'password'}
          label={'Password'}
          register={register}
          errors={errors}
          required
          minLength={6}
        />

        <button type="submit">Sign In</button>
      </form>

      <p>
        {`Don't have an account?`}
        <Link
          href={
            redirect
              ? `${User.signup.link}?redirect=${redirect}`
              : User.signup.link
          }
          passHref
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
