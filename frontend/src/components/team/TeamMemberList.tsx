import { FC } from "react"
import TeamMemberCard from "./TeamMemberCard"
import { Button } from "../ui/button"
import { RiAddCircleFill } from "react-icons/ri";
import useGetMembers from "@/hooks/useGetMembers";

interface TeamMemberListProps {
  isAdminAccess?: boolean,
  workspaceId?: string
}

const TeamMemberList: FC<TeamMemberListProps> = ({ isAdminAccess = false, workspaceId }) => {
  const { members } = useGetMembers(workspaceId ? workspaceId : "")
  const admin = members?.admins || []
  const member = members?.members || []
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold tracking-tighter mb-4">Admins</h2>
        <div className="space-y-4">
          {admin.map((member, index) => (
            <TeamMemberCard
              key={index}
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
          {
            member.length === 0 ? (
              <p className="text-muted-foreground px-6 py-6 border rounded-lg shadow-md">
                No collaborators found, invite some instead...
              </p>
            ) :
            member.map((mem, index) => (
              <TeamMemberCard
                key={index}
                member={mem}
                type="member"
                isAdminAccess={isAdminAccess}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TeamMemberList