import useWorkspacesWithActive from "./useWorkspaceWithActive"
import { useQueryClient } from "@tanstack/react-query"
import { UserData } from "@/types"

const useUserRole = () => {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData<UserData>(["user"])
    const {currentWorkspace} = useWorkspacesWithActive()

    let isAdmin = false;

    if (user && currentWorkspace) {
      if (currentWorkspace?.admins.includes(user.userId)) {
        isAdmin = true;
      }
    }
  return isAdmin
}

export default useUserRole