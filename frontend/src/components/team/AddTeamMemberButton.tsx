import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { RiAddCircleFill } from "react-icons/ri"
import { useMutation } from "@tanstack/react-query"
import { sendInvitation } from "@/lib/api"
import useGetActiveWorkspace from "@/hooks/useGetActiveWorkspace"
import { useToast } from "@/hooks/use-toast"

export function DialogDemo() {
    const {toast} = useToast()
    const [email, setEmail] = useState<string>('')
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const {currentWorkspaceId} = useGetActiveWorkspace()

    if (!currentWorkspaceId) {
        return <div>Loading...</div>
    }

    const {
        mutate: invite,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: () => sendInvitation(email, currentWorkspaceId),
        onSuccess: () => {
            toast({
                title: "Invitation Sent",
                description: "An invitation has been sent to the user",
                variant: "success"
            })
            setEmail('')
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
        }
    })

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const InviteUser = () => {
        invite()
        setIsDialogOpen(false)
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-3 text-muted-foreground" variant="secondary" onClick={() => setIsDialogOpen(true)}>
                    <RiAddCircleFill /> Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite a Collaborator</DialogTitle>
                    <DialogDescription>
                        Send an email to a collaborator to invite them to your workspace.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Email" className="text-right">
                            Email
                        </Label>
                        <Input id="Email" value={email} className="col-span-3" placeholder="@acme" onChange={handleEmailInput} />
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        onClick={InviteUser}
                        disabled={isPending}
                    >
                        {isPending ? 'Sending...' : 'Invite'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}