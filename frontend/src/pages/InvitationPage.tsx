import { useInvitation } from "@/contexts/InvitationContext"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RiGroupLine } from "react-icons/ri";

const InvitationPage = () => {
    const { invitationData } = useInvitation()

    // Change the data here depending on whether the invited person is a user or not
    const isUser = invitationData?.isUser

    return (
        <div className="centered-fullscreen min-h-screen bg-slate-100 font-primary">
            <Card className="max-w-[400px] w-[400px]">
                <CardHeader>
                    <span className="flex gap-2 items-center">
                        <RiGroupLine size={30}/>
                        <h1 className="font-bold tracking-tighter text-3xl">You have been invited!</h1>
                    </span>
                    <p className="text-sm text-muted-foreground">{invitationData?.email}</p>
                </CardHeader>
                
                <CardContent>
                    {isUser ? (
                        <div>
                            <h2 className="font-medium text-lg">Join <span className="text-brand">{invitationData.invitedBy.slice(0,5)}'s</span> workspace</h2>
                            <p className="text-sm leading-5 text-muted-foreground">Invites to workspaces exires after 7 days. Proceeding will redirect you to the workspace</p>

                            <Button className="mt-5 bg-green-500 hover:bg-green-600">Accept Invite</Button>
                        </div>
                    ) : (
                        <div>
                            <p>Sign up to join the workspace</p>
                            <Button>Sign Up</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default InvitationPage
