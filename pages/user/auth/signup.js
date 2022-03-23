import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Input from '../../../components/ui/Basic/Input/Input';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { User } from '../../../utils/settings';
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace(
          redirect
            ? `${User.signin.link}?redirect=${redirect}`
            : User.signup.redirect
        );
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: "Password doesn't match",
      });
      return;
    }

    const { data } = await axios.post('/api/auth/signup', formData);
    if (data.errors) {
      console.log(data.errors);
    } else {
      router.replace(
        redirect
          ? `${User.signin.link}?redirect=${redirect}`
          : User.signup.redirect
      );
    }
  };

  const SignUpForm = (
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

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return { SignUpForm };
  }
}
