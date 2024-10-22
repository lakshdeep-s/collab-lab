import mongoose from "mongoose"
import { dbConnection } from "../db/dbConnection.js"
const WorkspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: ''
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    active: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
)

export const WorkspaceModel = dbConnection.model("workspaces", WorkspaceSchema)