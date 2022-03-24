import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Basic/Input/Input';
import axios from 'axios';

export default function AddAddressView({ isAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (fields) => {
    const { data } = await axios.post('/api/address/add', fields);

    if (data.errors) {
      console.log(data);
    } else {
      isAdded(true);
    }
  };

  return (
    <div>
      <h1>Address Book</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={'Fullname'}
          register={register}
          errors={errors}
          required
        />

        <Input
          label={'Address'}
          customName={'street1'}
          register={register}
          errors={errors}
          required
        />
        <Input
          label={'Apt / Unit / Suite / etc. (Optional)'}
          customName={'street2'}
          register={register}
          errors={errors}
        />

        <Input label={'City'} register={register} errors={errors} required />

        <Input label={'State'} register={register} errors={errors} required />

        <Input
          label={'Zipcode'}
          customName={'zip'}
          register={register}
          errors={errors}
          required
        />

        <Input label={'Country'} register={register} errors={errors} required />

        <button type="Submit">Add Address</button>
      </form>
    </div>
  );
}
