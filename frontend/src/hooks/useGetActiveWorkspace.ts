import useAuth from "./useAuth"

const useGetActiveWorkspace = () => {
    const {user: authenticatedUser} = useAuth()
    const currentWorkspaceId = authenticatedUser?.currentWorkspace
  return {
    currentWorkspaceId
  }
}

export default useGetActiveWorkspace