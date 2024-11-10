import { useQueryClient } from "@tanstack/react-query"
import { UserData } from "@/types"
import useGetWorkspace from "./useGetWorkspace"

const useUserRole = () => {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData<UserData>(["user"])
    const {workspace: activeWorkspace} = useGetWorkspace(user?.currentWorkspace || '')

    let isAdmin = false;
    let isSuperAdmin = false;

    if (user && activeWorkspace) {
      if (activeWorkspace?.admins.includes(user.userId)) {
        isAdmin = true;
      }
      if (activeWorkspace?.superAdmin == user.userId) {
        isSuperAdmin
      }
    }
  return {isAdmin, isSuperAdmin}
}

export default useUserRole