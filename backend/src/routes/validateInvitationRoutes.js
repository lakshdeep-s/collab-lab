import express from "express"
import invitationValidator from "../middleware/invitationValidator.js"
import { errorCatcher } from "../utils/errorCatcher.js"
import { signupAndJoinTeam, validateInvitationController } from "../controllers/validateInvitationController.js"

const validateInvitationRouter = express.Router()

validateInvitationRouter.get(
  "/validate-invitation/:token",
  invitationValidator,
  errorCatcher(validateInvitationController)
)

validateInvitationRouter.post('/signup-and-join/:token', invitationValidator, errorCatcher(signupAndJoinTeam))

export default validateInvitationRouter
