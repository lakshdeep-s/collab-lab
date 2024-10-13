import express from "express"
import { errorCatcher } from "../utils/errorCatcher.js"
import { createWorkspaceController, deleteWorkspaceController, getAllWorkspacesController, getWorkspaceController, updateWorkspaceController } from "../controllers/workspaceController.js"

const workspaceRouter = express.Router()

// Create a workspace
workspaceRouter.post("/workspace/create-workspace", errorCatcher(createWorkspaceController))

// Delete a workspace (requires admin privileges)
workspaceRouter.delete("/workspace/delete-workspace/:workspaceId", errorCatcher(deleteWorkspaceController))

// Update a workspace (requires admin priveleges)
workspaceRouter.put("/workspace/update-workspace/:workspaceId", errorCatcher(updateWorkspaceController))

// GET all the workspaces the user is part of
workspaceRouter.get("/workspace/get-workspace/:workspaceId", errorCatcher(getWorkspaceController))

// GET a particular workspace based on the workspaceId (user must be a member for successful GET)
workspaceRouter.get("/workspace/get-all-workspaces", errorCatcher(getAllWorkspacesController))

export default workspaceRouter