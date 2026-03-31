import { WebSocketServer } from 'ws';
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import {checkPermission} from "./db/index.js"

dotenv.config();
const wss = new WebSocketServer({ port: 8080 });

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET)

wss.on('connection', async (client, req) => {
    
    console.log(req.url);
    const params = req.url.split('?')[1].split("&");

    const token = params[0].split("=")[1];
    const docId = params[1].split("=")[1];

    console.log(token);
    console.log(docId);

    const user = await jwt.verify(token, JWT_SECRET);
    const username = user.username;
    const userId = user.userId;

    const role = await checkPermission(userId, docId);
    if(!token || !userId || role == "UNAUTHRIZED") {
        client.close(1008, "You don't have permissions for this document")
    }

    client.send("ROLE:"+role);  

    client.on('message', (message) => {
        console.log('Received:', message.toString());

        client.send('Server received: ' + message);
    });

    client.on('close', (code, msg) => {
        console.log('Client disconnected : ',code, " ", msg.toString());
    });

    try{

    }catch(err){
        console.log(err)
        client.close(1008, err);
    }
});

console.log('WebSocket server running on ws://localhost:8080');