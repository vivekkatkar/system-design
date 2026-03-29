
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

export async function authMiddleware(req, res, next){
    const  headers = req.headers;
    const auth = headers.authorization;

    // console.log(headers);
    // console.log(auth);
    const token = auth.split(" ")[1];

    // console.log(token);

    if(!token){
        return res.json({
            status : 400,
            message : "Unauthrized user"
        })
    }

    // console.log(req);
    try{
        const user = await jwt.verify(token, JWT_SECRET);
        const username = user.username;
        const userId = user.userId;

        if(req.method != "GET"){
            req.body.username = username;
            req.body.userId = userId;
        }

        next();
    }catch(err){
        console.log(err)
        return res.json({
            status : 400,
            message : "Unauthrized user : " + err
        })
    }
}