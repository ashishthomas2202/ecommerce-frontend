import React from 'react';

export default function AddressCard({ data }) {
  // console.log(data);
  const { fullname, street1, street2, city, state, zip, country } = data;

  return (
    <div>
      <h5>{fullname || ''}</h5>
      <p>{street1 || ''}</p>
      <p>{street2 || ''}</p>
      <p>{city || ''}</p>
      <p>{state || ''}</p>
      <p>{zip || ''}</p>
      <p>{country || ''}</p>
    </div>
  );
}
