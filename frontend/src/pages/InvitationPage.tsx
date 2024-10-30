import { useInvitation } from "@/contexts/InvitationContext"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const InvitationPage = () => {
    const { invitationData, token } = useInvitation()

    // Use the obtained token and send it to the backend route
    /**
     * 1) using the token, get the actual invitation -> extract the email -> check DB for existing user
     */
    return (
        <div className="centered-fullscreen min-h-screen bg-slate-100 font-primary">
            <Card className="max-w-[600px]">
                <CardHeader>
                    <h1 className="font-semibold tracking-tighter text-2xl">You have been invited !</h1>
                </CardHeader>
                
                <CardContent>
                    <h1>Join {invitationData}</h1>
                    <p>{token}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default InvitationPage