import nc from 'next-connect';
import { data } from '../../../utils/seed/userData';
import { ShippingAddress } from '../../../utils/shipping';

const handler = nc();

handler.post(async (req, res) => {
  //   console.log(req.body);
  const data = await ShippingAddress.addressValidation(req.body);

  if (data.verification.success) {
    res.send(data);
  } else {
      
  }
});

export default handler;
