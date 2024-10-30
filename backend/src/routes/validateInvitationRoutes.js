import express from "express"
import invitationValidator from "../middleware/invitationValidator.js"
import { errorCatcher } from "../utils/errorCatcher.js"
import { validateInvitationController } from "../controllers/validateInvitationController.js"

const validateInvitationRouter = express.Router()

validateInvitationRouter.get(
  "/validate-invitation/:token",
  invitationValidator,
  errorCatcher(validateInvitationController)
)

export default validateInvitationRouter
