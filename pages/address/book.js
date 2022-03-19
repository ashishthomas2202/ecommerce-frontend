import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Basic/Input/Input';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';
import { Address, User } from '../../utils/settings';
import axios from 'axios';

export default function Book() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push(`${User.signin.link}?redirect=${Address.book.link}`);
    }
  });

  const onSubmit = async (fields) => {
    const data = await axios.post('/api/address/verification', fields);

    console.log(data);
  };
  return (
    <div>
      <h1>Address Book</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
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
