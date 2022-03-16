import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';
import { User } from '../../utils/settings';
import axios from 'axios';
import LocalStorage from '../../utils/localStorage';

export default function Signin() {
  const router = useRouter();
  const { redirect } = router.query; // signin?redirect=/shipping

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  if (!redirect && userInfo) {
    router.push(User.signin.redirect);
  }

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/user/signin', {
        userId,
        password,
      });

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
        <label htmlFor="userId">Username or Email: </label>
        <input
          id="userId"
          name="userId"
          type="text"
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
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
        <Link href="/user/register" passHref>
          Register
        </Link>
      </p>
    </div>
  );
}
