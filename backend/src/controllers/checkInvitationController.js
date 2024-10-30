import { AppErrorCode } from "../constants/AppErrorCodes.js";
import { BAD_REQUEST, OK } from "../constants/HTTPCodes.js";
import { UserModel } from "../model/user.model.js";
import appAssert from "../utils/appAssert.js";

export const checkInvitationController = async (req, res) => {
    const invitation = req.invitation
    
    appAssert(invitation, "Invitation not found, (Invalid token)", BAD_REQUEST, AppErrorCode.InvalidInvitationToken)

    let isUser = false
    let userId = null
    
    const user = await UserModel.findOne({email: invitation.email})

    if (user) {
        isUser = true
        userId = user._id
    } else {
        userId = null
    }
    return res.status(OK).json({
        isUser: isUser,
        userId: userId,
        workspaceId: invitation.workspaceId
    })
}