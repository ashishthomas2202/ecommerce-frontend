import React from 'react';
import Link from 'next/link';
export default function login() {
  return (
    <div>
      <h1>Login</h1>
      <br />
      <form>
        <label htmlFor="username">Username: </label>
        <input id="username" type="text" />
        <br />
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" />
        <br />
        <button>Login</button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link href="/user/register" passHref>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
