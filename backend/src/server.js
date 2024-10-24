import dotenv from "dotenv"
import express from "express"
import cors from "cors"
dotenv.config()

import errorHandler from "./middleware/errorHandler.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import authenticate from "./middleware/authenticate.js"
import { checkMongoConnection } from "./db/dbConnection.js"
import cookieParser from "cookie-parser"
import workspaceRouter from "./routes/workspaceRoutes.js"
import projectRouter from "./routes/projectRoutes.js"
import taskRouter from "./routes/taskRoutes.js"
import invitationRouter from "./routes/invitationRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000


// Middleware
app.use(cors(
   {
        origin: "http://localhost:5173",
        credentials: true
    }
))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/auth", authRouter)

app.use("/user", authenticate, userRouter)

app.use("/api", authenticate, workspaceRouter)
app.use("/api", authenticate, projectRouter)
app.use("/api", authenticate, taskRouter)
app.use("/api", authenticate, invitationRouter)

// Global error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  checkMongoConnection()
})
