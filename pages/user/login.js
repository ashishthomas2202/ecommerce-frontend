import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/user/login', {
        userId,
        password,
      });
      console.log('data:', data);
      alert('Successful');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
      console.log(err.message);
    }
  }
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
