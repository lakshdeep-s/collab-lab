import { CREATED, NOT_FOUND, OK } from "../constants/HTTPCodes.js"
import { createProjectService, deleteProjectService, updateProjectService } from "../services/project.service.js"
import appAssert from "../utils/appAssert.js"

export const createProjectController = async (req, res) => {
    const userId = req.userId
    appAssert(userId, "User id not found", NOT_FOUND)

    const workspaceId = req.params.workspaceId
    appAssert(workspaceId, "Workspace id not found", NOT_FOUND)

    const {name, description} = req.body
    appAssert(name, "Name is required", NOT_FOUND)
    appAssert(description, "Description is required", NOT_FOUND)

    const result = await createProjectService(workspaceId, userId, name, description)

    return res.status(CREATED).json(result)
}

export const deleteProjectController = async (req, res) => {
    const userId = req.userId
    appAssert(userId, "User id not found", NOT_FOUND)

    const projectId = req.params.projectId
    appAssert(projectId, "Project id not found", NOT_FOUND)

    const workspaceId = req.params.workspaceId
    appAssert(workspaceId, "Workspace id not found", NOT_FOUND)

    const result = await deleteProjectService(projectId, userId, workspaceId)

    return res.status(OK).json(result)
}

export const updateProjectController = async (req, res) => {
    const userId = req.userId;
    appAssert(userId, "User ID is required", NOT_FOUND);

    const projectId = req.params.projectId;
    appAssert(projectId, "Project ID is required", NOT_FOUND);

    const workspaceId = req.params.workspaceId;
    appAssert(workspaceId, "Workspace ID is required", NOT_FOUND);

    const { name, description } = req.body;

    const projectData = {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
    };

    const result = await updateProjectService(projectId, userId, workspaceId, projectData);

    return res.status(OK).json(result);
};