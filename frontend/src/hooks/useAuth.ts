import { useQuery } from "@tanstack/react-query"
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

    return {user, ...rest}
}

export default useAuth