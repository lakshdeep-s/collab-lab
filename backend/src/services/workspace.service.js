import { UserModel } from "../model/user.model.js"
import { WorkspaceModel } from "../model/workspace.model.js"
import appAssert from "../utils/appAssert.js"
import { FORBIDDEN, NOT_FOUND } from "../constants/HTTPCodes.js"
import omitPasswordOnResponse from "../utils/omitPasswordOnResponse.js"

// Anyone can create a new user : (Becomes Super Admin)
export const createWorkspaceService = async (userId, name, description) => {
  const user = await UserModel.findById(userId)
  appAssert(user, "User not found", NOT_FOUND)

  const workspace = new WorkspaceModel({
    name,
    description,
    superAdmin: userId,
    admins: [userId],
    members: [userId],
  })

  await workspace.save()

  user.currentWorkspace = workspace._id
  await user.save()

  return workspace
}
// Acess : Super Admin
export const deleteWorkspaceService = async (workspaceId, userId) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isSuperAdmin = workspace.superAdmin == userId
  appAssert(
    isSuperAdmin,
    "User is not authorized to delete this workspace",
    FORBIDDEN
  )

  await WorkspaceModel.findByIdAndDelete(workspaceId);

  const nextWorkspace = await WorkspaceModel.findOne({
    members: userId,
    _id: {$ne: workspaceId}
  })

  await UserModel.findByIdAndUpdate(userId, {
    currentWorkspace: nextWorkspace ? nextWorkspace._id : null
  })

  return { message: "Workspace deleted successfully" }
}

// Access : Super Admin
export const updateWorkspaceService = async (
  workspaceId,
  userId,
  workspaceData
) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isSuperAdmin = workspace.superAdmin == userId
  appAssert(
    isSuperAdmin,
    "User is not authorized to update this workspace",
    FORBIDDEN
  )

  Object.assign(workspace, workspaceData)

  await workspace.save()
  return workspace
}

// Get All Workspaces for a user
export const getAllWorkspacesService = async (userId) => {
  const workspaces = await WorkspaceModel.find({ members: userId }).lean()
  return workspaces
}

export const getWorkspaceService = async (workspaceId, userId) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isMember = workspace.members.includes(userId)
  appAssert(isMember, "User is not a member of this workspace", FORBIDDEN)

  return workspace
}

// Set active workspace for a user
export const setActiveWorkspaceService = async (workspaceId, userId) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isMember = workspace.members.includes(userId)
  appAssert(isMember, "User is not a member of this workspace", FORBIDDEN)

  await UserModel.findByIdAndUpdate(userId, {currentWorkspace: workspaceId})

  return workspace
}

// Get all the members of the workspace
export const getAllMembersService = async (workspaceId, userId) => {
  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const isMember = workspace.members.includes(userId)
  appAssert(isMember, "User is not a member of this workspace", FORBIDDEN)

  const admins = await Promise.all(workspace.admins.map(async (adminId) => {
    const admin = await UserModel.findById(adminId).lean()
    return admin ? omitPasswordOnResponse(admin) : null
  })).then(admins => admins.filter(Boolean))

  const nonAdminMembers = workspace.members.filter((memberId) => {
    return !workspace.admins.includes(memberId)
  })

  const members = await Promise.all(nonAdminMembers.map(async (memberId) => {
    const member = await UserModel.findById(memberId).lean()
    return member ? omitPasswordOnResponse(member) : null
  })).then(members => members.filter(Boolean))

  const superAdmin = omitPasswordOnResponse(
    await UserModel.findById(workspace.superAdmin).lean().exec()
  );

  return {admins, members, superAdmin}
}