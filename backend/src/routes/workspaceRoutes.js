import express from "express"
import { errorCatcher } from "../utils/errorCatcher.js"
import { createWorkspaceController, deleteWorkspaceController, getAllMembersController, getAllWorkspacesController, getWorkspaceController, setActiveWorkspaceController, updateWorkspaceController } from "../controllers/workspaceController.js"

const workspaceRouter = express.Router()

// Create a workspace
workspaceRouter.post("/workspace/create-workspace", errorCatcher(createWorkspaceController))

// Delete a workspace (requires admin privileges)
workspaceRouter.delete("/workspace/delete-workspace/:workspaceId", errorCatcher(deleteWorkspaceController))

// Update a workspace (requires admin priveleges)
workspaceRouter.put("/workspace/update-workspace/:workspaceId", errorCatcher(updateWorkspaceController))

// GET a particular workspace based on the workspaceId (user must be a member for successful GET)
workspaceRouter.get("/workspace/get-workspace/:workspaceId", errorCatcher(getWorkspaceController))

// GET all the workspaces the user is part of
workspaceRouter.get("/workspace/get-all-workspaces", errorCatcher(getAllWorkspacesController))

// Set a workspace as active (requires user to be a member of the workspace)
workspaceRouter.put("/workspace/set-active/:workspaceId", errorCatcher(setActiveWorkspaceController))

// Get all the members of a give workspace
workspaceRouter.get("/workspace/get-all-members/:workspaceId", errorCatcher(getAllMembersController))

export default workspaceRouter