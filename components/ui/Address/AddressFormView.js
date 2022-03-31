import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Basic/Input/Input';
import axios from 'axios';
import Button from '../Basic/Button/Button';

export default function AddressFormView({
  task = 'add',
  added,
  updated,
  updateItemData = null,
  cancel,
  totalAddresses,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: updateItemData ? updateItemData : {} });

  const onSubmit = async (fields) => {
    switch (task) {
      case 'add': {
        const { data } = await axios.post(
          '/api/user/account/address/add',
          fields
        );

        if (data.errors) {
          console.log(data.errors);
        } else {
          console.log(data);
          added();
        }
        break;
      }
      case 'update': {
        // console.log(fields);
        const { data } = await axios.put('/api/user/account/address/update', {
          ...fields,
        });

        if (data.errors) {
          console.log(data.errors);
        } else {
          console.log(':Updated:', data);
          updated();
        }
        break;
      }
    }
  };

  // if (task == 'update') {
  //   console.log('From UpdateForm', updateItemData);
  // }

  return (
    <div>
      <Button
        label={'< Cancel'}
        onClickHandler={() => {
          cancel();
        }}
      />
      <h1>{task == 'add' ? 'Add Address' : 'Update Address'}</h1>
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

        {totalAddresses !== 0 && (
          <>
            <Input
              label={'Default shipping address'}
              customName={'defaultShippingAddress'}
              type={'checkbox'}
              register={register}
              errors={errors}
            />

            <Input
              label={'Default billing address'}
              customName={'defaultBillingAddress'}
              type={'checkbox'}
              register={register}
              errors={errors}
            />
          </>
        )}
        <button type="Submit">
          {task == 'add' ? 'Add Address' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import Input from '../Basic/Input/Input';
// import axios from 'axios';
// import Button from '../Basic/Button/Button';

// export default function AddressFormView({
//   task = 'add',
//   added,
//   updated,
//   updateItemData = null,
//   cancel,
//   totalAddresses,
// }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues: updateItemData ? updateItemData : {} });

//   const onSubmit = async (fields) => {
//     switch (task) {
//       case 'add': {
//         const { data } = await axios.post(
//           '/api/user/account/address/add',
//           fields
//         );

//         if (data.errors) {
//           console.log(data.errors);
//         } else {
//           console.log(data);
//           added();
//         }
//         break;
//       }
//       case 'update': {
//         // console.log(fields);
//         const { data } = await axios.put('/api/user/account/address/update', {
//           ...fields,
//         });

//         if (data.errors) {
//           console.log(data.errors);
//         } else {
//           console.log(data);
//           updated();
//         }
//         break;
//       }
//     }
//   };

//   // if (task == 'update') {
//   //   console.log('From UpdateForm', updateItemData);
//   // }

//   return (
//     <div>
//       <Button
//         label={'< Back'}
//         onClickHandler={() => {
//           cancel();
//         }}
//       />
//       <h1>{task == 'add' ? 'Add Address' : 'Update Address'}</h1>
//       <br />
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           label={'Fullname'}
//           register={register}
//           errors={errors}
//           required
//         />

//         <Input
//           label={'Address'}
//           customName={'street1'}
//           register={register}
//           errors={errors}
//           required
//         />
//         <Input
//           label={'Apt / Unit / Suite / etc. (Optional)'}
//           customName={'street2'}
//           register={register}
//           errors={errors}
//         />

//         <Input label={'City'} register={register} errors={errors} required />

//         <Input label={'State'} register={register} errors={errors} required />

//         <Input
//           label={'Zipcode'}
//           customName={'zip'}
//           register={register}
//           errors={errors}
//           required
//         />

//         <Input label={'Country'} register={register} errors={errors} required />

//         {totalAddresses !== 0 && (
//           <>
//             <Input
//               label={'Default shipping address'}
//               customName={'defaultShippingAddress'}
//               type={'checkbox'}
//               register={register}
//               errors={errors}
//             />

//             <Input
//               label={'Default billing address'}
//               customName={'defaultBillingAddress'}
//               type={'checkbox'}
//               register={register}
//               errors={errors}
//             />
//           </>
//         )}
//         <button type="Submit">
//           {task == 'add' ? 'Add Address' : 'Save Changes'}
//         </button>
//       </form>
//     </div>
//   );
// }
