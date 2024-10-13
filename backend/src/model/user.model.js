import mongoose from "mongoose";
import { dbConnection } from "../db/dbConnection.js";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    }
}, {timestamps: true})

export const UserModel = dbConnection.model("users", UserSchema)

