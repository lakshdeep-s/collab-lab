import express from "express"
const authRouter = express.Router()

import {
  registerController,
  loginController,
  logoutController,
  refreshHandler,
} from "../controllers/authController.js"

import { errorCatcher } from "../utils/errorCatcher.js"

// User Auth
authRouter.post("/register", errorCatcher(registerController))
authRouter.post("/login", errorCatcher(loginController))
authRouter.post("/logout", errorCatcher(logoutController))

// Refresh Endpoint
authRouter.get("/refresh", errorCatcher(refreshHandler))

export default authRouter
