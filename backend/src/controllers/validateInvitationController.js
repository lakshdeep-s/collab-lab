import { OK } from "../constants/HTTPCodes.js"
import { UserModel } from "../model/user.model.js"

export const validateInvitationController = async (req, res) => {   
    const {email, workspaceId, invitedBy} = req.invitation

    let userId = null
    let isUser = false

    const user = await UserModel.findOne({email})
    if (user) {
        userId = user._id
        isUser = true
    }   

    res.status(OK).json({
        userId,
        isUser,
        email,
        workspaceId,
        invitedBy,
    })
}