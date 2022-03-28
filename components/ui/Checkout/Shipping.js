import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Shipping({ back, status, next }) {
  const router = useRouter();

//  useEffect(()=>{
//       router.push(
//     {
//       pathname: '/checkout/',
//       query: { type: 'shipping' },
//     },
//     undefined,
//     { shallow: true }
//   );
//  },[]);

  return (
    <div>
      <h1>Shipping</h1>
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
