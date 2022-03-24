// import Easypost from '@easypost/api';

// const api = new Easypost(process.env.EASYPOST_API);

async function addressValidation(fields) {
  //   let api = process.env.JWT_SECRET;
  // const api = new Easypost(process.env.EASYPOST_API);
  // this address will not be verified
  // const verifiableAddress = new api.Address({
  //   verify: ['delivery'],
  //   ...fields,
  // });
  // return verifiableAddress.save();
}

export const ShippingAddress = { addressValidation };
