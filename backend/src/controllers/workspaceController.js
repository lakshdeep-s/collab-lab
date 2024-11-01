import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../constants/HTTPCodes.js"
import { createWorkspaceService, deleteWorkspaceService, getAllMembersService, getAllWorkspacesService, getWorkspaceService, setActiveWorkspaceService, updateWorkspaceService } from "../services/workspace.service.js"
import appAssert from "../utils/appAssert.js"

export const createWorkspaceController = async (req, res) => {
    const {name, description} = req.body
    const userId = req.userId

    appAssert(userId, "User ID is required", BAD_REQUEST);
    appAssert(name, "Workspace name is required", NOT_FOUND)

    const workspace = await createWorkspaceService(userId, name, description)

    return res.status(CREATED).json({
        data: workspace
    })
}


export const deleteWorkspaceController = async (req, res) => {
    const userId = req.userId

    appAssert(userId, "User ID is required", BAD_REQUEST);

    const workspaceId = req.params.workspaceId
    appAssert(workspaceId, "Workspace ID is required", BAD_REQUEST)

    const result = await deleteWorkspaceService(workspaceId, userId)

    return res.status(OK).json(result)
}

export const updateWorkspaceController = async (req, res) => {
    const userId = req.userId;
    appAssert(userId, "User ID is required", BAD_REQUEST);

    const workspaceId = req.params.workspaceId;
    appAssert(workspaceId, "Workspace ID is required", BAD_REQUEST);

    const { name, description } = req.body;

    const workspaceData = {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
    };

    const workspace = await updateWorkspaceService(workspaceId, userId, workspaceData);

    return res.status(OK).json({ workspace });
};

export const getAllWorkspacesController = async (req, res) => {
    const userId = req.userId
    appAssert(userId, "User ID is required", BAD_REQUEST)

    const workspaces = await getAllWorkspacesService(userId)

    return res.status(OK).json(workspaces)
}

export const getWorkspaceController = async (req, res) => {
    const userId = req.userId
    appAssert(userId, "User ID is required", BAD_REQUEST)

    const workspaceId = req.params.workspaceId
    appAssert(workspaceId, "Workspace ID is required", BAD_REQUEST)

    const workspace = await getWorkspaceService(workspaceId, userId)

    return res.status(OK).json({
        data: workspace
    })
}

export const setActiveWorkspaceController = async (req, res) => {
    const userId = req.userId
    const workspaceId = req.params.workspaceId

    appAssert(userId, "User ID is required", BAD_REQUEST);
    appAssert(workspaceId, "Workspace ID is required", BAD_REQUEST);

    const result = await setActiveWorkspaceService(workspaceId, userId);

    return res.status(OK).json(result)
}

export const getAllMembersController = async (req, res) => {
    const userId = req.userId
    const workspaceId = req.params.workspaceId

    appAssert(userId, "User ID is required", BAD_REQUEST);
    appAssert(workspaceId, "Workspace ID is required", BAD_REQUEST);

    const result = await getAllMembersService(workspaceId, userId);
    
    return res.status(OK).json({
        data: result
    })
}