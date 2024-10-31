import dotenv from "dotenv"
dotenv.config()
import { InvitationModel } from "../model/invitation.model.js";
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY
const resend = new Resend(resendKey);

export const createInvitation = async (token, email, workspaceId, adminId) => {
    const invitation = await InvitationModel.create({   
        email,
        workspaceId,
        invitedBy: adminId,
        token
    })
}

export const sendInvitation = async (invitationLink, email, workspaceName, ) => {
    const {data, error} = await resend.emails.send({
        from: `${process.env.NODE_ENV === 'development' ? process.env.RESEND_DEVELOPMENT_DOMAIN : process.env.RESEND_PRODUCTION_DOMAIN}`,
        to: [email],
        subject: `Invitation to join ${workspaceName}`,
        html: `
            <h1>You've been invited to join ${workspaceName}</h1>
            <p>Click the link below to accept the invitation:</p>
            <a href="${invitationLink}">Join Workspace</a>
            <p>This invitation will expire in 7 days.</p>
        `
    })
    return {data, error}
}