import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';
import { User } from '../../utils/settings';
import axios from 'axios';

export default function Signin() {
  const router = useRouter();
  const { redirect } = router.query; // signin?redirect=/shipping

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  if (!redirect && userInfo) {
    router.push(User.signin.redirect);
  }

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
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
  }

  return (
    <div>
      <h1>Sign In</h1>
      <br />
      <form onSubmit={handleFormSubmit}>
        {User.email && !User.username ? (
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

        {User.username && !User.email ? (
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

        {User.username && User.email ? (
          <span>
            <label htmlFor="userId">Username or Email: </label>
            <input
              id="userId"
              name="userId"
              type="text"
              onChange={(e) => setUserId(e.target.value)}
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
        <button>Sign In</button>
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
