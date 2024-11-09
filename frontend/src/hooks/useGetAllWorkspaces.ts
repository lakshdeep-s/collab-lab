import { useQuery } from "@tanstack/react-query"
import { getAllWorkspaces } from "@/lib/api"

const useGetAllWorkspaces = () => {
    const {
        data: userWorkspaces,
        ...rest
    } = useQuery({
        queryKey: ['workspaces'],
        queryFn: getAllWorkspaces,
        staleTime: Infinity
    })

    return {
        userWorkspaces,
        ...rest
    }
}

export default useGetAllWorkspaces