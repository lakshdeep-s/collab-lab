import { useInvitation } from "@/contexts/InvitationContext"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const InvitationPage = () => {
    const { invitationData, token } = useInvitation()
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