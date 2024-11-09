import { CREATED, NOT_FOUND, OK } from "../constants/HTTPCodes.js"
import { UserModel } from "../model/user.model.js"
import bcrypt from 'bcryptjs'
import { WorkspaceModel } from "../model/workspace.model.js"
import appAssert from "../utils/appAssert.js"
import omitPasswordOnResponse from "../utils/omitPasswordOnResponse.js"
import { InvitationModel } from "../model/invitation.model.js"

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

export const signupAndJoinTeam = async (req, res) => {
    const {workspaceId} = req.invitation
    const {username, email, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        currentWorkspace: workspaceId
    })

    const workspace = await WorkspaceModel.findById(workspaceId)
    appAssert(workspace, "Workspace not found", NOT_FOUND)

    await WorkspaceModel.findByIdAndUpdate(
        workspaceId,
        {$push: {members: newUser._id}},
        {new: true}
    )

    await InvitationModel.findByIdAndDelete(req.invitation._id)
    
    res.status(CREATED).json({
        message: "Joined team successfully",
    })
}

export const joinTeam = async (req, res) => {
    const {workspaceId} = req.invitation
    const {userId} = req.body

    const workspace = await WorkspaceModel.findById(workspaceId)
    appAssert(workspace, "Workspace not found", NOT_FOUND)

    await WorkspaceModel.findByIdAndUpdate(
        workspaceId,
        {$push: {members: userId}},
        {new: true}
    )

    await UserModel.findByIdAndUpdate(
        userId,
        {currentWorkspace: workspaceId},
        {new: true}
    )

    await InvitationModel.findByIdAndDelete(req.invitation._id)

    res.status(CREATED).json({
        message: "Joined team successfully",
    })
}