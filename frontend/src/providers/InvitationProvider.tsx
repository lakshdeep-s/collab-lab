import { Navigate, useParams, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
// import API from "@/config/apiClient"
import InvitationContext from "@/contexts/InvitationContext"

const InvitationProvider = () => {
    const { token } = useParams()
    const [isValidating, setIsValidating] = useState(true)
    const [isValid, setIsValid] = useState(false)
    const [invitationData, setInvitationData] = useState<string>('')

    useEffect(() => {
        const validateInvitation = async () => {
            if (!token) {
                setIsValidating(false)
                return
            }

            try {
                // If existing user -> send their credentials and add the user to the db
                // If not a user send with a flag that its a new user and he needs to regsiter, then add him to the database
                const response = "Invite is valid - [DEMO]"
                setInvitationData(response)
                setIsValid(true)
                setIsValidating(false)
            } catch (error) {
                setIsValid(false)
                setIsValidating(false)
            }
        }
        validateInvitation()
    }, [token])

    if (isValidating) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Validating token...</p>
            </div>
        );
    }

    if (!token || !isValid) {
        return <Navigate to={"/404"} replace/>
    }

    return (
        <InvitationContext.Provider value={{invitationData, token}}>
            <Outlet />
        </InvitationContext.Provider>
    )
}

export default InvitationProvider