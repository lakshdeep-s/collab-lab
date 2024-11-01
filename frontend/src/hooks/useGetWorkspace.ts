import { useQuery } from "@tanstack/react-query"
import { getWorkspace } from "@/lib/api"
import { WorkspaceData } from "@/types"

export const useGetWorkspace = (workspaceId: string) => {
    const {
        data: workspace,
        ...rest
    } = useQuery<WorkspaceData>({
        queryFn: () => {
            return getWorkspace(workspaceId)
        },
        enabled: !!workspaceId,
        queryKey: ['current-workspace'],
        staleTime: Infinity
    })
    return {workspace, ...rest}
}

export default useGetWorkspace