import { AppErrorCode } from "../constants/AppErrorCodes.js"
import { BAD_REQUEST } from "../constants/HTTPCodes.js"
import appAssert from "../utils/appAssert.js"
import { InvitationModel } from "../model/invitation.model.js"

const invitationValidator = (req, res, next) => {
    const {token} = req.params
    appAssert(token, "Invitation Token not found", BAD_REQUEST, AppErrorCode.InvitationTokenNotFound)

    const invitation = InvitationModel.findOne({token})
    appAssert(invitation, "Invalid Invitation Token", BAD_REQUEST, AppErrorCode.InvalidInvitationToken)

    req.invitation = invitation
    next()
}

export default invitationValidator