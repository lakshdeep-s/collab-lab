import useAuth from "./useAuth"
import { getAllWorkspaces } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

const useWorkspace = () => {
  const { activeWorkspace } = useAuth()

  const { data: userWorkspaces, ...rest } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
    staleTime: Infinity,
  })

  return {
    activeWorkspace,
    userWorkspaces,
    ...rest
  }
}

export default useWorkspace
