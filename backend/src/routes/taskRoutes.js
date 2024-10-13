import express from "express"
import {errorCatcher} from "../utils/errorCatcher.js"
import { createTaskController, deleteTaskController, updateTaskController } from "../controllers/taskController.js"
const taskRouter = express.Router()

taskRouter.post("/tasks/create-task/:workspaceId/:projectId", errorCatcher(createTaskController))
taskRouter.delete("/tasks/delete-task/:workspaceId/:projectId/:taskId", errorCatcher(deleteTaskController))
taskRouter.put("/tasks/update-task/:workspaceId/:projectId/:taskId", errorCatcher(updateTaskController))

export default taskRouter