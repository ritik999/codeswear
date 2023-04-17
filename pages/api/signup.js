import connectDb from "../../middleware/mongoose";
import UserSchema from '../../models/User';
import CryptoJS from "crypto-js";

const handler=async(req,res)=>{
    if(req.method == "POST"){
        console.log(req.body);
        let {name,email,password}=req.body;
        let u=new UserSchema({name,email,password:CryptoJS.AES.encrypt(password, 'secret123').toString()});
        await u.save();
        res.status(200).json({success:"success"});
    }else{
        res.status(400).json({error:"this method is not allowed"});
    }
}

export default connectDb(handler);