import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Basic/Input/Input';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';
import { User } from '../../utils/settings';
import axios from 'axios';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query; // signup?redirect=/signin

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  if (userInfo) {
    router.push(User.signup.redirect);
  }

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: "Password doesn't match",
      });
      return;
    }

    try {
      const { firstName, lastName, username, email, password } = formData;
      console.log('username', username);
      console.log('password', password);
      let fields = { firstName, lastName, password };
      if (User.username) {
        fields['username'] = username;
      }
      if (User.email) {
        fields['email'] = email;
      }

      const { data } = await axios.post('/api/user/signup', fields);

      dispatch({
        type: 'USER_SIGNUP',
        payload: data,
      });

      router.push(
        redirect
          ? `${User.signup.redirect}?redirect=${redirect}`
          : User.signup.redirect
      );
    } catch (err) {
      alert(
        err.response
          ? err.response.data
            ? err.response.data.message
            : err.response.data
          : err.message
      );
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={'First Name'}
          register={register}
          errors={errors}
          required
        />
        <Input
          label={'Last Name'}
          register={register}
          errors={errors}
          required
        />

        {User.username ? (
          <Input
            label={'Username'}
            register={register}
            errors={errors}
            required
            minLength={6}
          />
        ) : null}

        {User.email ? (
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

        <Input
          type={'password'}
          label={'Confirm Password'}
          register={register}
          errors={errors}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      <p>
        {`Already have an account?`}
        <Link href={User.signin.link} passHref>
          Sign In
        </Link>
      </p>
    </div>
  );
}
