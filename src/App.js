import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app=express()





/// need to improve later 
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))




app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())










///// router middlewares 

import testRouter from "./routes/test.routes.js"
import authRouter from "./routes/auth.routes.js"
import blogRouter from "./routes/blogs.routes.js"


app.use("/api/v1",testRouter)
app.use("/api/v1",authRouter)
app.use("/api/v1/user",blogRouter)







export {app}