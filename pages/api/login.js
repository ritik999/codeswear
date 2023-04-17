import connectDb from "../../middleware/mongoose";
import UserSchema from '../../models/User';
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method == "POST") {
        const user = await UserSchema.findOne({ "email": req.body.email });
        var bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        var originalPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (originalPass == req.body.password && user.email == req.body.email) {
                var token = jwt.sign({email:user.email, password:user.password}, 'jwtsecret',{expiresIn:"2d"});
                res.status(200).json({ success: true, token});
            } else {
                res.status(400).json({ success: false, message: 'invalid credentials' });
            }
        }
        else { res.status(400).json({ success: false, message: 'user not found' }); }
    } else {
        res.status(400).json({ error: "this method is not allowed" });
    }
}

export default connectDb(handler);