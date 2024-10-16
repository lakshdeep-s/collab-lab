import { useQuery } from "@tanstack/react-query"
import { getAuthenticatedUser } from "@/lib/api"

const useAuth = (options ={}) => {
    const {
        data: user,
        ...rest
    } = useQuery({
        queryKey: ["user"],
        queryFn: getAuthenticatedUser,
        staleTime: Infinity
    })
    return {user, ...rest}
}

export default useAuth