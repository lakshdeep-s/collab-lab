import dotenv from "dotenv"
dotenv.config()
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../constants/HTTPCodes.js"
import { WorkspaceModel } from "../model/workspace.model.js"

import {Resend} from "resend"
import appAssert from "../utils/appAssert.js"

const resend_key = process.env.RESEND_API_KEY
const resend = new Resend(resend_key)

export const sendInvitationService = async (adminId, workspaceId, email) => {
    const workspace = await WorkspaceModel.findById(workspaceId)
    appAssert(workspace, "Workspace not found", NOT_FOUND)

    const isAdmin = workspace.admins.includes(adminId)
    appAssert(isAdmin, "User is not an admin", UNAUTHORIZED)

    //Send invitation email with link here
    const {data, error} = await resend.emails.send({
        from: "lakshdeepsinghsiddhu@gmail.com",
        to: [email],
        subject: "Hello World",
        html: "<strong>It Works</strong>"
    })

    if (error) {
        appAssert(false, error.message, INTERNAL_SERVER_ERROR)
    }

    return data
}