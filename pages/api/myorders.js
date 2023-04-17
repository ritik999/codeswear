import connectDb from "../../middleware/mongoose";
import OrderSchema from '../../models/Order';
import jwt from 'jsonwebtoken';



const handler = async (req, res) => {
    if (req.method == "POST") {
        const token = req.body.token;
        const data = jwt.verify(token, 'jwtsecret');
        let orders=await OrderSchema.find({email:data.email});
        res.status(200).json({ orders})
    } else {
        res.status(400).json({ error: "this method is not allowed" });
    }
}

export default connectDb(handler);
