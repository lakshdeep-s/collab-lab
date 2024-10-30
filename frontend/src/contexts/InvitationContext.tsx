import {createContext, useContext} from "react"

export type InvitationData = {
    userId: string | null
    isUser: boolean
    email: string
    workspaceId: string,
    invitedBy: string,
}

export type InvitationContextType = {
    invitationData: InvitationData | null,
    token: string
}

const InvitationContext = createContext<InvitationContextType | undefined>(undefined)

export const useInvitation = () => {
    const context = useContext(InvitationContext)
    if (!context) {
        throw new Error("useInvitation must be used within at InvitationProvider");
    }
    return context;
}

export default InvitationContext