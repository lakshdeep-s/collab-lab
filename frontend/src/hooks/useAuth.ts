import { useQuery } from "@tanstack/react-query"

const useAuth = (options ={}) => {
    const {
        data: user,
        ...rest
    } = useQuery({
        queryKey: ["user"],
        queryFn: () => {},
        staleTime: Infinity
    })
}

export default useAuth