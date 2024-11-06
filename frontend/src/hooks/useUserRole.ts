import { useQueryClient } from "@tanstack/react-query"
import { UserData } from "@/types"
import useWorkspace from "./useWorkspace"

const useUserRole = () => {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData<UserData>(["user"])
    const {activeWorkspace} = useWorkspace()

    let isAdmin = false;

    if (user && activeWorkspace) {
      if (activeWorkspace?.admins.includes(user.userId)) {
        isAdmin = true;
      }
    }
  return isAdmin
}

export default useUserRole