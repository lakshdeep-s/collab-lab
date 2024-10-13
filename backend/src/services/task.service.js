import { FORBIDDEN, NOT_FOUND } from "../constants/HTTPCodes.js"
import { ProjectModel } from "../model/project.model.js"
import { TaskModel } from "../model/task.model.js"
import { UserModel } from "../model/user.model.js"
import { WorkspaceModel } from "../model/workspace.model.js"
import appAssert from "../utils/appAssert.js"

export const createTaskService = async (
  workspaceId,
  userId,
  projectId,
  taskData
) => {
  const user = await UserModel.findById(userId)
  appAssert(user, "User not found", NOT_FOUND)

  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const project = await ProjectModel.findById(projectId)
  appAssert(project, "Project not found", NOT_FOUND)

  const isAdmin = workspace.admins.includes(userId)
  appAssert(isAdmin, "User is not authorized to create task", FORBIDDEN)

  const task = new TaskModel({
    title: taskData.title,
    description: taskData.description,
    deadline: taskData.deadline,
    status: taskData.status,
    priority: taskData.priority,
    assignedTo: userId,
    project: projectId,
  })

  await task.save()
  return task
}

export const deleteTaskService = async (workspaceId, userId, projectId, taskId) => {
  const user = await UserModel.findById(userId)
  appAssert(user, "User not found", NOT_FOUND)

  const workspace = await WorkspaceModel.findById(workspaceId)
  appAssert(workspace, "Workspace not found", NOT_FOUND)

  const project = await ProjectModel.findById(projectId)
  appAssert(project, "Project not found", NOT_FOUND)

  const task = await TaskModel.findById(taskId)
  appAssert(task, "Task not found", NOT_FOUND)

  const isAdmin = workspace.admins.includes(userId)
  appAssert(isAdmin, "User is not authorized to delete task", FORBIDDEN)

  await TaskModel.findByIdAndDelete(taskId)
  return {message: "Task deleted successfully"}
}

export const updateTaskService = async (workspaceId, userId, projectId, taskId, taskData) => {
    const user = await UserModel.findById(userId);
    appAssert(user, "User not found", NOT_FOUND);

    const workspace = await WorkspaceModel.findById(workspaceId);
    appAssert(workspace, "Workspace not found", NOT_FOUND);

    const project = await ProjectModel.findById(projectId);
    appAssert(project, "Project not found", NOT_FOUND);

    const task = await TaskModel.findById(taskId);
    appAssert(task, "Task not found", NOT_FOUND);

    const isAdmin = workspace.admins.includes(userId);
    appAssert(isAdmin, "User is not authorized to update task", FORBIDDEN);

    Object.assign(task, taskData);

    await task.save();
    return task;
};
