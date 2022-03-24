import nc from 'next-connect';
// import { ShippingAddress } from '../../../utils/shipping';

const handler = nc();

handler.post(async (req, res) => {
  // const data = await ShippingAddress.addressValidation(req.body);

  // if (data.verification.success) {
  res.send('Hello');

  // } else {
  // }
});

export default handler;
