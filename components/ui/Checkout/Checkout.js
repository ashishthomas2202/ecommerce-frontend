import React from 'react';
import { useRouter } from 'next/router';

export default function Checkout({back,status,next}) {
  const router = useRouter();

  //   useEffect(() => {
  //     router.push(
  //       {
  //         pathname: '/checkout/',
  //         query: { type: 'checkout' },
  //       },
  //       undefined,
  //       { shallow: true }
  //     );
  //   }, []);
  return <div><h1>Checkout</h1>
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
  </button></div>;
}
