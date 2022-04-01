import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Basic/Input/Input';
import { User } from '../../../utils/settings';
import axios from 'axios';

export default function SignUp({ signin }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData, e) => {
    e.preventDefault();

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
      signin();
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
        {/* {`Already have an account?`}
        <Link href={User.signin.link} passHref>
          Sign In
        </Link> */}
        Don't have an account?
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            signin();
          }}
        >
          {' '}
          Sign In
        </span>
      </p>
    </div>
  );
}
