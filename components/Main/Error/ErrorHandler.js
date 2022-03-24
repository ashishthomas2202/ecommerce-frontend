import React from 'react';

export default function ErrorHandler({ error }) {
  return <div style={{ color: 'red' }}>{error.err ? error.message : ''}</div>;
}
