import React from 'react';

export default function Button({ className, label, onClickHandler }) {
  return (
    <button
      className={className ? className : ''}
      onClick={onClickHandler ? onClickHandler : () => {}}
    >
      {label ? label : 'Click'}
    </button>
  );
}
