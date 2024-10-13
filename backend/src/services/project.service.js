import { FORBIDDEN, NOT_FOUND } from "../constants/HTTPCodes.js"
import { ProjectModel } from "../model/project.model.js"
import { UserModel } from "../model/user.model.js"
import { WorkspaceModel } from "../model/workspace.model.js"
import appAssert from "../utils/appAssert.js"

export const createProjectService = async(workspaceId, userId, name, description) => {
    const user = await UserModel.findById(userId)
    appAssert(user, "User not found", NOT_FOUND)

    const workspace = await WorkspaceModel.findById(workspaceId)
    appAssert(workspace, "Workspace not found", NOT_FOUND)

    const isAdmin = workspace.admins.includes(userId)
    appAssert(isAdmin, "User is not authorized to create a project in this workspace", FORBIDDEN)

    const project = new ProjectModel({
        name,
        description,
        workspace: workspaceId,
        createdBy: userId
    })

    await project.save()
    return project
}

export const deleteProjectService = async(projectId, userId, workspaceId) => {
    const project = await ProjectModel.findById(projectId)
    appAssert(project, "Project not found", NOT_FOUND)

    const user = await UserModel.findById(userId)
    appAssert(user, "User not found", NOT_FOUND)

    const workspace = await WorkspaceModel.findById(workspaceId)
    appAssert(workspace, "Workspace not found", NOT_FOUND)

    const isAdmin = workspace.admins.includes(userId)
    appAssert(isAdmin, "User is not authorized to delete this project", FORBIDDEN)

    await ProjectModel.findByIdAndDelete(projectId)

    return {message: "Project deleted successfully"}
}

export const updateProjectService = async (projectId, userId, workspaceId, projectData) => {
    const project = await ProjectModel.findById(projectId);
    appAssert(project, "Project not found", NOT_FOUND);

    const user = await UserModel.findById(userId);
    appAssert(user, "User not found", NOT_FOUND);

    const workspace = await WorkspaceModel.findById(workspaceId);
    appAssert(workspace, "Workspace not found", NOT_FOUND);

    const isAdmin = workspace.admins.includes(userId);
    appAssert(isAdmin, "User is not authorized to update this project", FORBIDDEN);

    Object.assign(project, projectData);

    await project.save();
    return project;
};