import express from "express"
const userRouter = express.Router()

import { errorCatcher } from "../utils/errorCatcher.js"
import { userController } from "../controllers/userController.js"

userRouter.get("/", errorCatcher(userController))

export default userRouter
