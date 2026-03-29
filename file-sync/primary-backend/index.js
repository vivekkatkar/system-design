import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/user.router.js"
import docsRouter from "./routes/docs.router.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"

dotenv.config()

const port = process.env.PORT;
const app = express()

app.use(express.json())
app.use("/user", userRouter)
app.use("/docs", authMiddleware, docsRouter)

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});