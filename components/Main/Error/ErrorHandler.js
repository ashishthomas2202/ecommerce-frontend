import React from 'react';
// import { useEffect } from 'react/cjs/react.production.min';

export default function ErrorHandler({ error }) {
  // useEffect()

  //   const [errorState, setErrorState] = useState(false);
  return <div style={{ color: 'red' }}>{error.err ? error.message : ''}</div>;
}
