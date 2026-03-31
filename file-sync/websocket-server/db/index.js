import {client} from "./client.js"

export async function checkPermission(userId, docId){
    console.log(`Checking permissions of ${userId} for ${docId}`)
    const resp = await client.query("select * from Permissions where user_id = $1 AND doc_id = $2", [userId, docId]);

    if(resp.rows.length == 0){
        console.log("Don't have permission")
        return UNAUTHRIZED;
    }else{
        console.log(resp.rows[0])
        console.log("have permission")
        return resp.rows[0].role.toUpperCase();
    }
}