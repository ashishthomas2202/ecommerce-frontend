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

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');

  // if (User.username) {
  //   const [username, setUsername] = useState('');
  // }
  // if (User.email) {
  //   const [email, setEmail] = useState('');
  // }

  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  // async function handleFormSubmit(e) {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert("Password doesn't match");
  //     return;
  //   } else {
  //     try {
  //       let fields = { firstName, lastName, password };
  //       if (User.username) {
  //         fields['username'] = username;
  //       }
  //       if (User.email) {
  //         fields['email'] = email;
  //       }

  //       const { data } = await axios.post('/api/user/signup', fields);

  //       dispatch({
  //         type: 'USER_SIGNUP',
  //         payload: data,
  //       });

  //       router.push(
  //         redirect
  //           ? `${User.signup.redirect}?redirect=${redirect}`
  //           : User.signup.redirect
  //       );
  //     } catch (err) {
  //       alert(
  //         err.response
  //           ? err.response.data
  //             ? err.response.data.message
  //             : err.response.data
  //           : err.message
  //       );
  //       console.log(err.message);
  //     }
  //   }
  // }

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
      {/* <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="given-name">First Name: </label>
        <input
          id="given-name"
          name="given-name"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="family-name">Last Name: </label>
        <input
          id="family-name"
          name="family-name"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />

        {User.username ? (
          <span>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
          </span>
        ) : (
          ''
        )}

        {User.email ? (
          <span>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
          </span>
        ) : (
          ''
        )}

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />

        <button>Sign Up</button>
      </form> */}
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
