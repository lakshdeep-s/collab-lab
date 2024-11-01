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
        enabled: !!workspaceId && workspaceId.trim().length > 0,
        queryKey: ['current-workspace', workspaceId],
        staleTime: Infinity
    })
    return {workspace, ...rest}
}

export default useGetWorkspace