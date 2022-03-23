import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Input from '../../../components/ui/Basic/Input/Input';
import { useRouter } from 'next/router';
import { User } from '../../../utils/settings';
import { signIn, getSession } from 'next-auth/react';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { redirect } = router.query; // signin?redirect=/shipping

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace(redirect ? redirect : User.signin.redirect);
      } else {
        setIsLoading(false);
      }
    });
  }, []);
  const onSubmit = async (formData) => {
    let credentials = { password: formData.password };

    if (formData.userId) {
      credentials['userId'] = formData.userId;
    } else if (formData.username) {
      credentials['username'] = formData.username;
    } else if (formData.email) {
      credentials['username'] = formData.email;
    }

    const result = await signIn('credentials', {
      redirect: false,
      ...credentials,
    });

    if (!result.error) {
      router.replace(redirect ? redirect : User.signin.redirect);
    } else {
      console.log(result);
    }

    return;
  };

  const signInForm = (
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
            s
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

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return <div>{signInForm}</div>;
  }
}
