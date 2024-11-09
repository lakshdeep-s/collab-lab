import { useInvitation } from "@/contexts/InvitationContext"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RiGroupLine } from "react-icons/ri";
import RegisterAndJoinForm from "@/components/team/RegisterAndJoinForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiCircleLine } from "react-icons/ri";

const InvitationPage = () => {
    const navigate = useNavigate()
    const { invitationData, token} = useInvitation()
    const [error, setError] = useState<string | null>(null)
    const [joining, setJoining] = useState<boolean>(false)
    const [success, setSuccess] = useState<string | null>(null)

    // Change the data here depending on whether the invited person is a user or not
    const isUser = invitationData?.isUser

    const handleAcceptInvite = async() => {
        setJoining(true)
        setError(null)
        setSuccess(null)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/join/${token}`)
            if (response.status === 200) {
                setSuccess("Successfully joined workspace, proceed to login")
            } else {
                console.log(error)
                setError("Failed to join the workspace")
            }
        } catch(error) {
            console.log(error)
        }finally {
            setJoining(false)
        }
    }

    const redirectLogin = () => {
        navigate("/login", {
            replace: true
        })
    }

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
                            <h2 className="font-medium text-lg">Join workspace</h2>
                            <p className="text-sm leading-5 text-muted-foreground">Invites to workspaces exires after 7 days. Proceeding will redirect you to the workspace</p>

                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                            <Button className="mt-5 bg-green-500 hover:bg-green-600"
                                onClick={handleAcceptInvite}
                                disabled={joining}

                            >
                                {joining ? <RiCircleLine size={20} className="animate-spin text-white"/> : 'Accept Invite'}
                            </Button>

                            {success && 
                                <div>
                                    <span className="text-green-500 text-sm mt-2">{success}</span>
                                    <Button variant={'secondary'} onClick={redirectLogin}>
                                        Login
                                    </Button>
                                </div> 
                            }
                        </div>
                    ) : (
                        <RegisterAndJoinForm token={token} email={invitationData?.email || ''}/>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default InvitationPage
