import express from "express"
import { errorCatcher } from "../utils/errorCatcher.js"
import { createProjectController, deleteProjectController, updateProjectController } from "../controllers/projectController.js"
const projectRouter = express.Router()

projectRouter.post("/project/create-project/:workspaceId", errorCatcher(createProjectController))
projectRouter.delete("/project/delete-project/:workspaceId/:projectId", errorCatcher(deleteProjectController))
projectRouter.put("/project/update-project/:workspaceId/:projectId" ,errorCatcher(updateProjectController))

export default projectRouter