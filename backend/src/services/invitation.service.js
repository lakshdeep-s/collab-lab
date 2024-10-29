import dotenv from "dotenv"
dotenv.config()
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../constants/HTTPCodes.js"
import { WorkspaceModel } from "../model/workspace.model.js"

import appAssert from "../utils/appAssert.js"
import { UserModel } from "../model/user.model.js"
import { AppErrorCode } from "../constants/AppErrorCodes.js"
import { InvitationModel } from "../model/invitation.model.js"
import { generateInvitationToken } from "../utils/tokenUtils.js"
import { createInvitation, sendInvitation } from "../utils/invitationUtils.js"
import config from "../config/index.js"

export const sendInvitationService = async (adminId, workspaceId, email) => {
    const workspace = await WorkspaceModel.findById(workspaceId)
    appAssert(workspace, "Workspace not found", NOT_FOUND)

    const isAdmin = workspace.admins.includes(adminId)
    appAssert(isAdmin, "User is not an admin", UNAUTHORIZED)

    const user = await UserModel.findOne({email})
    if (user) {
        const existingMember = workspace.members.includes(user._id)
        appAssert(!existingMember, "User is already a member of the workspace", BAD_REQUEST, AppErrorCode.TeamMemberAlreadyExists)
    }

    const existingInvitation = await InvitationModel.findOne({
        email, 
        workspaceId,
        status: {$in: ['pending', 'accepted']}
    })

    appAssert(!existingInvitation, "Invitation has been already sent to this email", BAD_REQUEST, AppErrorCode.ExistingPendingInvitation)

    const token = generateInvitationToken()

    createInvitation(token, email, workspaceId, adminId)

    const invitationLink = `${config.CLIENT_URL}/invitation/${token}`

    const {error} = sendInvitation(invitationLink, email, workspace.name)

    if (error) {
        appAssert(false, error.message, INTERNAL_SERVER_ERROR)
    }

    return {
        message: "Invitation sent successfully"
    }
}
