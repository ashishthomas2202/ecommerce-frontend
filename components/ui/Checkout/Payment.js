import React from 'react';
import { useRouter } from 'next/router';
export default function Payment({ back, status, next }) {
  const router = useRouter();

  //   useEffect(() => {
  //     router.push(
  //       {
  //         pathname: '/checkout/',
  //         query: { type: 'payment' },
  //       },
  //       undefined,
  //       { shallow: true }
  //     );
  //   }, []);
  return (
    <div>
      <h1>Payment</h1>
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
