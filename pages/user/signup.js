import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';
import { User } from '../../utils/settings';
import axios from 'axios';

export default function SignUp() {
  const router = useRouter();
  const { redirect } = router.query; // signup?redirect=/signin
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  if (userInfo) {
    router.push(User.signup.redirect);
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  if (User.username) {
    const [username, setUsername] = useState('');
  }
  if (User.email) {
    const [email, setEmail] = useState('');
  }

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    } else {
      try {
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
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <br />
      <form onSubmit={handleFormSubmit}>
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
