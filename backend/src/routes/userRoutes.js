import express from "express"
const userRouter = express.Router()

import { errorCatcher } from "../utils/errorCatcher.js"
import { getMember, userController } from "../controllers/userController.js"

userRouter.get("/", errorCatcher(userController))
userRouter.get("/get-member", errorCatcher(getMember))


export default userRouter
