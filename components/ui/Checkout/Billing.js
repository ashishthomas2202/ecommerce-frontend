import React from 'react';
import { useRouter } from 'next/router';

export default function Billing({ back, status, next }) {
  const router = useRouter();

  return (
    <div>
      <h1>Billing</h1>
      <button
        onClick={() => {
          back();
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          next();
        }}
      >
        next
      </button>
    </div>
  );
}
