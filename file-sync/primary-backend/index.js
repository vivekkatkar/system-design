import express from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import cors from "cors"

import userRouter from "./routes/user.router.js"
import docsRouter from "./routes/docs.router.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"

dotenv.config()

const port = process.env.PORT;
const app = express()

app.use(express.json())
app.use(cors())
app.use("/user", userRouter)
app.use("/docs", authMiddleware, docsRouter)

app.get("/verify", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("verify : " ,token);
    if (!token) {
        return res.status(401).json({ valid: false });
    }


    try {
        console.log("Decoding token ");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.json({
            valid: true,
            userId: decoded.userId,
            username: decoded.username
        });
    } catch (err) {
        console.log("Decode error : ", err);
        res.status(401).json({ valid: false });
    }
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});