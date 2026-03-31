import express from "express"

import {client} from "../db/client.js"
import {ROLE} from "../utils/constants.js"

const router = express.Router()


router.post("/create", async (req, res) => {
    const {docname, userId, } = req.body;
    const docId = Math.random().toString();
    
    try{
        const resp = await client.query("insert into Documents(id, docname, created_by) values($1, $2, $3)", [docId, docname, userId]);
        
        const response = await client.query("INSERT into Permissions values($1, $2, $3)", [docId, userId, ROLE.OWNER]);

        console.log(resp);
        return res.json({
            status : 200, 
            message : "document created"
        })
    }catch(err){
        return res.json({
            status : 400, 
            message : "Error " + err
        })
    }
});

router.delete("/", async (req, res) => {
    const {docId} = req.body;
    
    try{
        const resp = await client.query("delete from Documents where id=$1", [docId]);
        
        console.log(resp);
        return res.json({
            status : 200, 
            message : "document deleted"
        })
    }catch(err){
        return res.json({
            status : 400, 
            message : "Error " + err
        })
    }
});

router.get("/:userId/", async (req, res) => {
    const userId = req.params.userId;
    
    try{
        const resp = await client.query("select * from documents where created_by=$1", [userId]);
        
        console.log(resp);
        return res.json({
            status : 200, 
            message : "Fetched all docs related to " + userId,
            data : resp.rows
        })
    }catch(err){
        return res.json({
            status : 400, 
            message : "Error " + err
        })
    }
});

router.post("/add/permission", async (req, res) => {
    console.log(req.body)
   const ownerId = req.body.userId;
   const {docId, toId, role} = req.body;
   
   
   try{
        let resp = await client.query("select * from Permissions where user_id = $1 AND doc_id = $2 AND role = $3", [ownerId, docId, ROLE.OWNER]);
        if(resp.rows.length == 0){
            return res.json({
                status : 400,
                message : "you are not owner of this document"
            })
        }

        resp = await client.query("select * from Permissions where user_id = $1 AND doc_id = $2 AND role = $3", [toId, docId, role]);
        if(resp.rows.length > 0){
            return res.json({
                status : 200,
                message : "Already Have same permission"
            })
        }

        
        resp = await client.query("select * from Permissions where user_id = $1 AND doc_id = $2", [toId, docId]);
        if(resp.rows.length > 0){
            resp = await client.query("update Permissions set role = $1 where user_id = $2 AND doc_id = $3", [role, toId, docId]);
            return res.json({
                status : 200,
                message : "Updated permission to this user"
            })
        }

        const response = await client.query("INSERT into Permissions values($1, $2, $3)", [docId, toId, role]);

        return res.json({
            status : 200,
            message : "added permission to user"
        })
   }catch(err){
        console.log(err);
        return res.json({
            status : 400, 
            message : "Error " + err
        })
   }
});

export default router;