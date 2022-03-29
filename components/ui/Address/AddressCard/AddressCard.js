import React, { useRef } from 'react';
// import { useEffect } from 'react/cjs/react.production.min';
import Button from '../../Basic/Button/Button';
import style from './AddressCard.module.scss';
export default function AddressCard({
  data,
  deleteHandler,
  editClickHandler,
  defaultShippingAddress,
  defaultBillingAddress,
  defaultHandler,
  selectable = false,
  selected,
  handleSelect,
}) {
  // console.log(data);
  const { _id, fullname, street1, street2, city, state, zip, country } = data;

  const cardRef = useRef();

  return (
    <div
      className={selected ? style.selected : ''}
      style={{
        height: '100%',
        border: '1px solid #000000',
        order: defaultShippingAddress || defaultBillingAddress ? 1 : 2,
      }}
      ref={cardRef}
      {...(selectable && {
        onClick: () => {
          handleSelect({ id: _id });
        },
      })}
    >
      <p>{_id}</p>
      <h5>{fullname || ''}</h5>
      <p>{street1 || ''}</p>
      <p>{street2 || ''}</p>
      <p>{city || ''}</p>
      <p>{state || ''}</p>
      <p>{zip || ''}</p>
      <p>{country || ''}</p>
      {!selectable && (
        <Button
          label={'Delete'}
          onClickHandler={() => {
            deleteHandler(_id);
          }}
        />
      )}
      {!selectable && (
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
      )}
      {!selectable && !defaultShippingAddress && (
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
      {!selectable && !defaultBillingAddress && (
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
