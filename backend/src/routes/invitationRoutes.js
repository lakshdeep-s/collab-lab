import express from "express"
import { errorCatcher } from "../utils/errorCatcher.js"
import {sendInvitationController } from "../controllers/invitationController.js"

const invitationRouter = express.Router()

invitationRouter.post("/invitation/:workspaceId/invite", errorCatcher(sendInvitationController))

export default invitationRouter