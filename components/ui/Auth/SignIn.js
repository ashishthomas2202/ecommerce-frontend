import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Basic/Input/Input';
import { User } from '../../../utils/settings';
import { signIn } from 'next-auth/react';

export default function SignIn({ signup, authenticate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData, e) => {
    e.preventDefault();

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
      authenticate();
    } else {
      console.log(result);
    }
    return;
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
          />
        ) : null}

        {User.username && !User.email ? (
          <Input
            label={'Username'}
            register={register}
            errors={errors}
            required
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
        />

        <button type="submit">Sign In</button>
      </form>

      <p>
        Don't have an account?
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            signup();
          }}
        >
          {' '}
          Sign Up
        </span>
      </p>
    </div>
  );
}
