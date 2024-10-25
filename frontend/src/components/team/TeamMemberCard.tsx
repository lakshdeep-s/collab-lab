import { FC } from "react"
import { TeamMember } from "@/types"
import { RiAccountCircleLine } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TeamMemberCardProps {
  member: TeamMember
  isAdminAccess: boolean
  type: 'admin' | 'member'
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ member, isAdminAccess, type}) => {
  const isAdmin = type === 'admin'

  return (
    <Card className={`w-full ${isAdmin ? 'border-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-2/5 sm:w-1/3 flex items-center space-x-2">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback>
                <RiAccountCircleLine className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow min-w-0">
              <h3 className="text-sm font-semibold truncate">{member.username}</h3>
              <p className="text-xs text-muted-foreground truncate">{member.email}</p>
            </div>
          </div>
          
          <div className="w-1/3 hidden md:block">
            <span className="text-xs text-muted-foreground">
              Last Login: {member.lastLogin.toLocaleString()}
            </span>
          </div>
          
          <div className="flex-grow" />
          
          <div className="w-1/4 sm:w-1/3 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                {isAdminAccess && !isAdmin && <DropdownMenuItem>Remove</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TeamMemberCard