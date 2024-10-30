import { Navigate, useParams, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import InvitationContext, { InvitationData } from "@/contexts/InvitationContext"
import axios from "axios"

const InvitationProvider = () => {
    const { token } = useParams<{ token: string }>()
    const [isValidating, setIsValidating] = useState(true)
    const [isValid, setIsValid] = useState(false)
    const [invitationData, setInvitationData] = useState<InvitationData | null>(null)

    useEffect(() => {
        const validateInvitation = async () => {
            if (!token) {
                setIsValidating(false)
                return
            }

            try {
                const response = await axios.get<InvitationData>(`${import.meta.env.VITE_API_URL}/api/validate-invitation/${token}`);
                console.log(response.data)
                setInvitationData(response.data)
                setIsValid(true)
                setIsValidating(false)
            } catch (error) {
                console.error("Failed to validate invitation:", error);
                setIsValid(false)
            } finally {
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
        return <Navigate to={"/404"} replace />
    }

    return (
        <InvitationContext.Provider value={{ invitationData, token }}>
            <Outlet />
        </InvitationContext.Provider>
    )
}

export default InvitationProvider