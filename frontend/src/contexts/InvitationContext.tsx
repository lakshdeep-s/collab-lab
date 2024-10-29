import {createContext, useContext} from "react"

export type InvitationContextType = {
    invitationData: string,
    token: string
}

const InvitationContext = createContext<InvitationContextType>({invitationData: '', token: ''})

export const useInvitation = () => {
    const context = useContext(InvitationContext)
    if (!context) {
        throw new Error("useInvitation must be used within at InvitationProvider");
    }
    return context;
}

export default InvitationContext