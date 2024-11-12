import { NOT_FOUND, OK } from "../constants/HTTPCodes.js"
import { UserModel } from "../model/user.model.js"
import { WorkspaceModel } from "../model/workspace.model.js"
import appAssert from "../utils/appAssert.js"

export const userController = async (req, res) => {
  const user = await UserModel.findById(req.userId)
  appAssert(user, NOT_FOUND, "User not found")

  return res.status(OK).json({
    data: {
      userId: user._id,
      username: user.username,
      email: user.email,
      lastLogin: user.lastLogin,
      currentWorkspace: user.currentWorkspace
    }
  })
}

export const getMember = async (req, res) => {
  const { userId, workspaceId } = req.query;  // Get parameters from query instead of body

  appAssert(userId, NOT_FOUND, "UserId not found");
  appAssert(workspaceId, NOT_FOUND, "WorkspaceId not found");
  
  const workspace = await WorkspaceModel.findById(workspaceId);
  appAssert(workspace, NOT_FOUND, "Workspace not found");

  const isUser = workspace.members.includes(userId) || workspace.admins.includes(userId) || workspace.superAdmin == userId;
  appAssert(isUser, NOT_FOUND, "User not found in workspace");

  const user = await UserModel.findById(userId);

  return res.status(OK).json({
    data: {
      username: user.username,
      email: user.email,
      lastLogin: user.lastLogin,
    }
  });
};

