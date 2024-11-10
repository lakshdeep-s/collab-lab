import { FC } from "react";
import TeamMemberCard from "./TeamMemberCard";
import { Button } from "../ui/button";
import { RiAddCircleFill } from "react-icons/ri";
import useGetMembers from "@/hooks/useGetMembers";
import { DialogDemo } from "./AddTeamMemberButton";

interface TeamMemberListProps {
  isAdminAccess?: boolean,
  isSuperAdminAccess?: boolean,
  workspaceId?: string
}

const TeamMemberList: FC<TeamMemberListProps> = ({ isAdminAccess = false, isSuperAdminAccess, workspaceId }) => {
  const { members } = useGetMembers(workspaceId ? workspaceId : "");
  const admin = members?.admins || [];
  const member = members?.members || [];
  const superAdmin = members?.superAdmin;

  return (
    <div className="space-y-8">
      {/* Super Admin Section */}
      {superAdmin && (
        <div>
          <h2 className="text-lg font-semibold tracking-tighter mb-4">Super Admin</h2>
          <div className="space-y-4">
            <TeamMemberCard
              member={superAdmin}
              type="superAdmin"
              isAdminAccess={false}  // SuperAdmin details are typically view-only
            />
          </div>
        </div>
      )}

      {/* Admins Section */}
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

      {/* Members Section */}
      <div>
        <h2 className="text-lg font-semibold tracking-tighter mb-4 flex items-center gap-4">
          Members 
          {(isAdminAccess || isSuperAdminAccess) && (
            <span>
              <DialogDemo />
            </span>
          )}
        </h2>
        <div className="space-y-4">
          {member.length === 0 ? (
            <p className="text-muted-foreground px-6 py-6 border rounded-lg shadow-md">
              No collaborators found, invite some instead...
            </p>
          ) : (
            member.map((mem, index) => (
              <TeamMemberCard
                key={index}
                member={mem}
                type="member"
                isAdminAccess={isAdminAccess}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamMemberList;
