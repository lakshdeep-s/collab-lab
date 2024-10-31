import { sendInvitationService } from "../services/invitation.service.js"
import { NOT_FOUND } from "../constants/HTTPCodes.js"
import appAssert from "../utils/appAssert.js"

export const sendInvitationController = async (req, res) => {
    const userId = req.userId
    appAssert(userId, 'User not found', NOT_FOUND)

    const workspaceId = req.params.workspaceId
    appAssert(workspaceId, 'Workspace not found', NOT_FOUND)

    const {email} = req.body
    appAssert(email, "Email not found", NOT_FOUND)

    const result = await sendInvitationService(userId, workspaceId, email)

    return res.status(200).json(result)
}   
