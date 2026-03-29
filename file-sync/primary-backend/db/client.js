
import {Client} from "pg"

export const client = await new Client({
    host: "localhost",
    database: "googledocsdb",
    port: "5432",
    user: "root",
    password : "sam"

}).connect();