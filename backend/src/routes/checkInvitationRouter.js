import express from "express"
import { errorCatcher } from "../utils/errorCatcher.js"
import { checkInvitationController } from "../controllers/checkInvitationController.js"

const checkInvitationRouter = express.Router()

checkInvitationRouter.post("/invitation/:token/accept", errorCatcher(checkInvitationController))

export default checkInvitationRouter