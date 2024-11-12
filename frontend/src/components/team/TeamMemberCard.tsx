import { FC } from "react";
import { TeamMember } from "@/types";
import { Link } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatLastLogin } from "@/lib/utils";

interface TeamMemberCardProps {
  member: TeamMember;
  isAdminAccess: boolean;
  type: 'admin' | 'member' | 'superAdmin';
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ member, isAdminAccess, type }) => {
  const isAdmin = type === 'admin';
  const isSuperAdmin = type === 'superAdmin';

  return (
    <Card className="w-full">
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
            <span className="text-xs text-green-500">
              Last Login: {formatLastLogin(member.lastLogin)}
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
                {/* All users can view profiles */}
                <DropdownMenuItem>
                  <Link to={`/team/${member._id}`}>
                    View Profile
                  </Link>
                </DropdownMenuItem>

                {/* Super Admin can remove admins and members */}
                {isSuperAdmin && isAdminAccess && isAdmin && <DropdownMenuItem>Remove Admin</DropdownMenuItem>}
                {isSuperAdmin && isAdminAccess && !isAdmin && <DropdownMenuItem>Remove Member</DropdownMenuItem>}

                {/* Admins can remove members but not other admins or super admin */}
                {isAdminAccess && !isSuperAdmin && !isAdmin && (
                  <DropdownMenuItem>Remove Member</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TeamMemberCard;
