import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { NavLink, useNavigate } from "react-router-dom"
import { queryClient } from "@/config/reactQuery"
import { extractUserInitials } from "@/lib/utils"
import { UserData } from "@/types"
import { RiDoorOpenLine } from "react-icons/ri";
import { RiSettings3Line } from "react-icons/ri";
import { logout } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export default function UserOptions() {
    const navigate = useNavigate()
    const user = queryClient.getQueryData<UserData>(["user"])

    if (!user) return null // Handle the case where User data is missing

    const {mutate} = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate("/login")
        }
    })

    function handleLogout() {
        mutate()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 p-0 rounded-md">
                    <Avatar className="h-10 w-10 rounded-none">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
                        <AvatarFallback className="rounded-md bg-slate-200">
                            {extractUserInitials(user.username)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-primary">
                <DropdownMenuItem asChild>
                    <NavLink to="/account" className="flex items-center gap-2 font-medium"><RiSettings3Line size={18} className="text-neutral-700"/> Account</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogout()} className="flex items-center gap-2 font-medium">
                <RiDoorOpenLine size={18} className="text-neutral-700"/> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}