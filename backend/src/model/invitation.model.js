import mongoose from "mongoose";
import { dbConnection } from "../db/dbConnection.js";

const InvitationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workspaces",
        required: true
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 7*24*60*60*1000) // 7 days from now
    }
}, {timestamps: true})

export const InvitationModel = dbConnection.model("invitations", InvitationSchema)