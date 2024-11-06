import { useEffect, useState } from "react"
import useGetActiveWorkspace from "./useGetActiveWorkspace"
import useGetAllWorkspaces from "./useGetAllWorkspaces"
import { WorkspaceData } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { setActiveWorkspace } from "@/lib/api"
import { useQueryClient } from "@tanstack/react-query"

const useWorkspace = () => {
    const queryClient = useQueryClient()
    // Get the current workspace Id from a hook the returns the Id of the active workspace of the current authenticated user
    const {currentWorkspaceId} = useGetActiveWorkspace()
    // get all the workspaces associated with the current authenticated user
    const {userWorkspaces} = useGetAllWorkspaces()

    // state to store the current workspace of the user
    const [currentWorkspace, setCurrentWorkspace] = useState<string | undefined>(
        userWorkspaces?.find((workspace) => workspace._id === currentWorkspaceId)?.name || undefined
    )
    
    // useEffect to set the state with the name of workspace for the currentWorkspaceId
    useEffect(() => {
        setCurrentWorkspace(
            userWorkspaces?.find((workspace) => workspace._id === currentWorkspaceId)?.name || undefined
        )
    }, [currentWorkspaceId, userWorkspaces, currentWorkspace])

    // Mutation to set the currentWorkspace of the authenticated user on the backend
    const {
        mutate: switchWorkspace,
    } = useMutation({
        mutationFn: setActiveWorkspace,
        onSuccess: async (newCurrentWorkspace) => {
            // Log the currentWorkspace
            console.log(newCurrentWorkspace.name)
            await Promise.all([
                queryClient.invalidateQueries({queryKey: ["user"]}),
                queryClient.invalidateQueries({queryKey: ["workspaces"]}),
                queryClient.invalidateQueries({queryKey: ["current-workspace", newCurrentWorkspace._id]})
            ])
        }
    })

    // Method to switch between the current workspace
    const handleWorkspaceSwitch = async (workspaceName: string) => {
        const newWorkspace = userWorkspaces?.find(
            (workspace: WorkspaceData) => workspace.name === workspaceName
        )

        if (newWorkspace) {
            setCurrentWorkspace(newWorkspace.name)
        }
        // Call the set active mutation
        switchWorkspace(newWorkspace?._id as string)
    }

  return {
    currentWorkspace,
    userWorkspaces,
    handleWorkspaceSwitch
  }
}

export default useWorkspace