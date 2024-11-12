import { FC } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMember } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useGetActiveWorkspace from "@/hooks/useGetActiveWorkspace";
import { useNavigate } from "react-router-dom";

const UserProfilePage: FC = () => {
  const { currentWorkspaceId: workspaceId } = useGetActiveWorkspace()
  const navigate = useNavigate()

  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    navigate("/team")
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getMember(workspaceId!, userId!),
    staleTime: Infinity
  })

  if (isLoading) return <div>Loading User Data...</div>
  if (error) return <div>Error Loading Data</div>

  const { username, email, lastLogin } = data || {}

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-xl font-primary">
      <h2 className="text-2xl font-bold tracking-tighter">Profile of {username}</h2>

      {/* Profile Information */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">User Information</h3>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
          <p>Last Login: {new Date(lastLogin).toLocaleString()}</p>
        </CardContent>
      </Card>

      {/* Task Completion Data */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Task Completion Data</h3>
          <ul>
            <li>Active Tasks: 10</li>
            <li>Pending Tasks: 5</li>
            <li>Completed Tasks: 20</li>
          </ul>
        </CardContent>
      </Card>

      {/* Assign Task Button */}
      <Button className="w-full mt-4">
        Assign Task (Placeholder)
      </Button>
    </div>
  )
}

export default UserProfilePage