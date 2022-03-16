import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';
import { User } from '../../utils/settings';
import axios from 'axios';
import LocalStorage from '../../utils/localStorage';

export default function Login() {
  const router = useRouter(); // login?redirect=/shipping
  const { redirect } = router.query;

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  if (!redirect && userInfo) {
    router.push(User.login.redirect);
  }

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/user/login', {
        userId,
        password,
      });

      dispatch({
        type: 'USER_LOGIN',
        payload: data,
      });
      LocalStorage.setItem('userInfo', JSON.stringify(data));
      router.push(redirect || User.login.redirect);
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
      console.log(err.message);
    }
  }

  // console.log('login');

  return (
    <div>
      <h1>Login</h1>
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
        <button>Login</button>
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
