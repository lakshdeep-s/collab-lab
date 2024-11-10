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

export function DialogDemo() {
    const [email, setEmail] = useState<string>('')
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

    const handleEmailInput = (e: any) => {
        setEmail(e.target.value)
    }

    const InviteUser = () => {
        console.log(email)
        setIsDialogOpen(false)
    }

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-3 text-muted-foreground" variant="secondary" onClick={() => setIsDialogOpen(prev => !prev)}>
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
                    <Button onClick={InviteUser}>Invite</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
