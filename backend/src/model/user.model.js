import mongoose from "mongoose";
import { dbConnection } from "../db/dbConnection.js";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    currentWorkspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workspaces",
        default: null
    }
}, {timestamps: true})

export const UserModel = dbConnection.model("users", UserSchema)

