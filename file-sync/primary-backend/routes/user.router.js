import express from "express"

import {client} from "../db/client.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;
// console.log("JWT : " , JWT_SECRET)

const router = express.Router()

router.post("/signup", async (req, res) => {
    const {username, password} = req.body;

    try{
        const result = await client.query('select * from Users where username=$1', [username]);

        if(result.rows.length > 0){
            return res.json({
                status : 300,
                message : "user already exists"
            })
        }

        const id = Math.random().toString();
        const hash = await bcrypt.hash(password, 10);
        console.log(hash);
        const response = await client.query('INSERT into Users values($1, $2, $3)', [id, username, hash]);

        return res.json({
                status : 200,
                message : "user created with id : " + id, 
            })
    }catch(e){
        console.log("Errror : ", e);
        return res.json({
                status : 400,
                message : e 
            })
    }
});


router.post("/signin", async (req, res) => {
    const {username, password} = req.body;

    try{
        const result = await client.query('select * from Users where username=$1', [username]);

        if(result.rows.length == 0){
            return res.json({
                status : 300,
                message : "user doesn't exists"
            })
        }

        const user = result.rows[0];

        const bresult = await bcrypt.compare(password, user.password);
        
        if(bresult){
            const token = await jwt.sign({
                username, 
                userId : user.id, 
            }, JWT_SECRET);
            
            return res.json({
                status : 200,
                message : "Login successfull",
                token : token
            })
        }else{
            return res.json({
                status : 400,
                message : "Wrong Credentials"
            })
        }

    }catch(e){
        console.log("Errror : ", e);
        return res.json({
                status : 400,
                message : e 
            })
    }
});

router.get("/test-db", async (req, res) => {
    const sql = "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');"

    try{
        const result = await client.query(sql);
        res.json({
            status : 200,
            message : result
        })
    }catch(err){
        res.json({
            status : 400,
            message : err
        })
    }
});

export default router;