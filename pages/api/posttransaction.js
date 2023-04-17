import connectDb from "../../middleware/mongoose";
import Razorpay from "razorpay";
import crypto from "crypto";
import OrderSchema from '../../models/Order';


const handler = async (req, res) => {
    if (req.method == "POST") {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        console.log(req.body);

        let body = razorpay_order_id + "|" + razorpay_payment_id;

        // var crypto = require("crypto");
        let expectedSignature = crypto.createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuth = expectedSignature === razorpay_signature;
        if (isAuth) {
            let obj=await OrderSchema.findOneAndUpdate({orderId:razorpay_order_id},{status:'Paid'});
            res.redirect(`/order?id=${obj._id}`,200)
            // res.status(200).json({success:true})
        } else {
            res.status(400).json({ success: false })
        }
    }
}


export default connectDb(handler);