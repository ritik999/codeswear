import connectDb from "../../middleware/mongoose";
import Razorpay from "razorpay";
import OrderSchema from '../../models/Order';


const handler=async(req,res)=>{
    if(req.method=="POST"){
        // console.log(req.body.cart);

        var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET })
        var options = {
            amount: req.body.subTotal * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
        const order=await instance.orders.create(options);
        if(order){
            let orderss=new OrderSchema({
                email:req.body.email,
                orderId:order.id,
                address:req.body.address,
                amount:req.body.subTotal,
                products:req.body.cart
            })
            await orderss.save();
        }
        // console.log(order);
        res.status(200).json({success:true,order})
    }
}


export default connectDb(handler);