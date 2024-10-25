import { UserModel } from "../model/user.model.js"
import { WorkspaceModel } from "../model/workspace.model.js"
import appAssert from "../utils/appAssert.js"
import { FORBIDDEN, NOT_FOUND } from "../constants/HTTPCodes.js"

export const createWorkspaceService = async (userId, name, description) => {
  const user = await UserModel.findById(userId)
  appAssert(user, "User not found", NOT_FOUND)

  await WorkspaceModel.updateMany(
    { members: userId, active: true },
    { $set: { active: false } }
  )

  const workspace = new WorkspaceModel({
    name,
    description,
    createdBy: userId,
    admins: [userId],
    members: [userId],
    active: true
  })

  await workspace.save()
  return workspace
}

export const deleteWorkspaceService = async (workspaceId, userId) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isAdmin = workspace.admins.includes(userId)
  appAssert(
    isAdmin,
    "User is not authorized to delete this workspace",
    FORBIDDEN
  )

  const wasActive = workspace.active

  await WorkspaceModel.findByIdAndDelete(workspaceId)

  if (wasActive) {
    const otherWorkspace = await WorkspaceModel.findOne({ members: userId })
    if (otherWorkspace) {
      otherWorkspace.active = true
      await otherWorkspace.save()
    }
  }

  return { message: "Workspace deleted successfully" }
}

export const updateWorkspaceService = async (
  workspaceId,
  userId,
  workspaceData
) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isAdmin = workspace.admins.includes(userId)
  appAssert(
    isAdmin,
    "User is not authorized to update this workspace",
    FORBIDDEN
  )

  if (workspaceData.active === true) {
    await WorkspaceModel.updateMany(
      { members: userId, active: true },
      { $set: { active: false } }
    )
  }

  Object.assign(workspace, workspaceData)

  await workspace.save()
  return workspace
}

export const getAllWorkspacesService = async (userId) => {
  const workspaces = await WorkspaceModel.find({ members: userId }).lean()
  return { workspaces }
}

export const getWorkspaceService = async (workspaceId, userId) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isMember = workspace.members.includes(userId)
  appAssert(isMember, "User is not a member of this workspace", FORBIDDEN)

  return workspace
}

export const setActiveWorkspaceService = async (workspaceId, userId) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isMember = workspace.members.includes(userId)
  appAssert(isMember, "User is not a member of this workspace", FORBIDDEN)

  await WorkspaceModel.updateMany(
    { members: userId, active: true },
    { $set: { active: false } }
  )
  workspace.active = true
  await workspace.save()

  return workspace
}


export const getAllMembersService = async (workspaceId, userId) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isMember = workspace.members.includes(userId)
  appAssert(isMember, "User is not a member of this workspace", FORBIDDEN)

  const members = await UserModel.find({ _id: { $in: workspace.members } })

  return members
}