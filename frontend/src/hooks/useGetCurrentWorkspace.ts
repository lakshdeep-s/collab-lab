import { WorkspaceData } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useGetCurrentWorkspace = () => {
    const currentWorkspace = useQuery<WorkspaceData>({
        queryKey: ['active-workspace'],
        enabled: true,
        staleTime: Infinity
    }).data

    if (!currentWorkspace) {
        return undefined
    }

  return currentWorkspace
}

export default useGetCurrentWorkspace