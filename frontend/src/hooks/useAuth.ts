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
    
    const { workspace } = useGetWorkspace(user?.currentWorkspace || '');

    return {user, activeWorkspace: workspace, ...rest}
}

export default useAuth