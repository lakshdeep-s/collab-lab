import { useQuery } from "@tanstack/react-query"
import { getAuthenticatedUser } from "@/lib/api"
import { UserData } from "@/types"
import { AxiosResponse } from "axios"

const useAuth = (options ={}) => {
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