import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../ui/Basic/Input/Input';
import { User } from '../../../utils/settings';
import Link from 'next/link';

export default function SignInForm({ redirect }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
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
