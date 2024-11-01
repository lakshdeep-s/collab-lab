import { useQuery } from "@tanstack/react-query"
import useGetWorkspace from "./useGetWorkspace"
import { getAuthenticatedUser } from "@/lib/api"
import { UserData } from "@/types"

const useAuth = () => {
    const {
        data: user,
        ...rest
    } = useQuery<UserData>({
        queryKey: ["user"],
        queryFn: getAuthenticatedUser,
        staleTime: Infinity
    })
    
    const activeWorkspace = user?.currentWorkspace
    const {workspace} = useGetWorkspace(activeWorkspace || '')

    return {user, activeWorkspace: workspace, ...rest}
}

export default useAuth