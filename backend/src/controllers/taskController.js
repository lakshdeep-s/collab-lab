import { CREATED, NOT_FOUND, OK } from "../constants/HTTPCodes.js"
import { createTaskService, deleteTaskService, updateTaskService} from "../services/task.service.js"
import appAssert from "../utils/appAssert.js"

export const createTaskController = async (req, res) => {
    const userId = req.userId
    appAssert(userId, "User id not found", NOT_FOUND)

    const workspaceId = req.params.workspaceId
    appAssert(workspaceId, "Workspace id not found", NOT_FOUND)

    const projectId = req.params.projectId
    appAssert(projectId, "Project id not found", NOT_FOUND)

    const {title, description, deadline, status, priority} = req.body
    const result = await createTaskService(workspaceId, userId, projectId, {title, description, deadline, status, priority})

    return res.status(CREATED).json(result)
}

export const deleteTaskController = async (req, res) => {
    const userId = req.userId
    appAssert(userId, "User id not found", NOT_FOUND)

    const workspaceId = req.params.workspaceId
    appAssert(workspaceId, "Workspace id not found", NOT_FOUND)

    const projectId = req.params.projectId
    appAssert(projectId, "Project id not found", NOT_FOUND)

    const taskId = req.params.taskId
    appAssert(taskId, "Task id not found", NOT_FOUND)

    const result = await deleteTaskService(workspaceId, userId, projectId, taskId)

    return res.status(OK).json(result)
}

export const updateTaskController = async (req, res) => {
    const userId = req.userId;
    appAssert(userId, "User id not found", NOT_FOUND);

    const { workspaceId, projectId, taskId } = req.params;
    appAssert(workspaceId, "Workspace id not found", NOT_FOUND);
    appAssert(projectId, "Project id not found", NOT_FOUND);
    appAssert(taskId, "Task id not found", NOT_FOUND);

    const { title, description, deadline, status, priority } = req.body;

    const taskData = {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(deadline !== undefined && { deadline }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
    };

    const result = await updateTaskService(workspaceId, userId, projectId, taskId, taskData);

    return res.status(OK).json(result);
};