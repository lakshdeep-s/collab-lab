import { AppErrorCode } from "../constants/AppErrorCodes.js"
import { BAD_REQUEST } from "../constants/HTTPCodes.js"
import appAssert from "../utils/appAssert.js"
import { InvitationModel } from "../model/invitation.model.js"

const invitationValidator = async (req, res, next) => {
    const { token } = req.params;
    console.log('Token received in middleware:', token);

    appAssert(token, "Invitation Token not found", BAD_REQUEST, AppErrorCode.InvitationTokenNotFound);

    const invitation = await InvitationModel.findOne({ token });
    appAssert(invitation, "Invalid Invitation Token", BAD_REQUEST, AppErrorCode.InvalidInvitationToken);

    req.invitation = invitation;
    next();
};

export default invitationValidator;
