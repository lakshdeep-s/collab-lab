import { getAllMembers } from "@/lib/api"
import { MemberResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

const useGetMembers = (workspaceId: string) => {
  const { data: members, ...options } = useQuery<MemberResponse>({
    queryKey: ["members", workspaceId],
    queryFn: () => getAllMembers(workspaceId),
    enabled: !!workspaceId,
    staleTime: Infinity,
  })
  return {
    members,
    options,
  }
}

export default useGetMembers
