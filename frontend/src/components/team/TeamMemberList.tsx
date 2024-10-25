import { FC } from "react"
import { TeamMember, UserData } from "@/types"
import TeamMemberCard from "./TeamMemberCard"
import { Button } from "../ui/button"
import { RiAddCircleFill } from "react-icons/ri";

interface TeamMemberListProps {
  listItems?: TeamMember[]
  admins?: UserData[]
  members?: UserData[]
  isAdminAccess?: boolean
}

const TeamMemberList: FC<TeamMemberListProps> = ({ admins=[], members=[], isAdminAccess = false }) => {

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold tracking-tighter mb-4">Admins</h2>
        <div className="space-y-4">
          {admins.map((member) => (
            <TeamMemberCard
              key={member.userId}
              member={member}
              type="admin"
              isAdminAccess={isAdminAccess}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tighter mb-4 flex items-center gap-4">Members {isAdminAccess &&
          <span><Button className="flex items-center gap-3 text-muted-foreground" variant={'secondary'}><RiAddCircleFill /> Add Member</Button></span>
        }</h2>
        <div className="space-y-4">
          {members.map((member) => (
            <TeamMemberCard
              key={member.userId}
              member={member}
              type="member"
              isAdminAccess={isAdminAccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamMemberList