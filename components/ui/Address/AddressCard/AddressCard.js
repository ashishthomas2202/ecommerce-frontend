import React from 'react';
import Button from '../../Basic/Button/Button';

export default function AddressCard({
  data,
  deleteHandler,
  editClickHandler,
  defaultShippingAddress,
  defaultBillingAddress,
  defaultHandler,
}) {
  // console.log(data);
  const { _id, fullname, street1, street2, city, state, zip, country } = data;

  return (
    <div
      style={{
        height: '100%',
        border: '1px solid #000000',
        order: defaultShippingAddress || defaultBillingAddress ? 1 : 2,
      }}
    >
      <h5>{fullname || ''}</h5>
      <p>{street1 || ''}</p>
      <p>{street2 || ''}</p>
      <p>{city || ''}</p>
      <p>{state || ''}</p>
      <p>{zip || ''}</p>
      <p>{country || ''}</p>
      <Button
        label={'Delete'}
        onClickHandler={() => {
          deleteHandler(_id);
        }}
      />
      <Button
        label={'Edit'}
        onClickHandler={() => {
          editClickHandler({
            ...data,
            defaultShippingAddress,
            defaultBillingAddress,
          });
        }}
      />
      {!defaultShippingAddress && (
        <>
          <br />
          <Button
            label={'Set as Default Shipping Address'}
            onClickHandler={() => {
              defaultHandler({ defaultShippingAddress: _id });
            }}
          />
        </>
      )}
      {!defaultBillingAddress && (
        <>
          <br />
          <Button
            label={'Set as Default Billing Address'}
            onClickHandler={() => {
              defaultHandler({ defaultBillingAddress: _id });
            }}
          />
        </>
      )}
      <p style={{ color: 'green' }}>
        {defaultShippingAddress && 'Default Shipping Address'}
      </p>
      <p style={{ color: 'blue' }}>
        {defaultBillingAddress && 'Default Billing Address'}
      </p>
    </div>
  );
}
