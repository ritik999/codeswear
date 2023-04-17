// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // console.log(req.body);
  const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
  
  res.status(200).json({ name: 'John Doe' })
}
