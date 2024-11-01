import { useEffect, useState } from "react"
import useWorkspace from "./useWorkspace"
import { WorkspaceData } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { setActiveWorkspace } from "@/lib/api"
import { useQueryClient } from "@tanstack/react-query"

export type ActiveWorkspace = {
  workspaceName: string
  workspaceId: string
}

const useWorkspaceToggle = () => {
  const queryClient = useQueryClient()
  const { activeWorkspace, userWorkspaces } = useWorkspace()

  // Active workspace could be null
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    ActiveWorkspace | undefined
  >(undefined)

  // Set active workspace name when component mounts
  useEffect(() => {
    if (activeWorkspace) {
      setSelectedWorkspace({
        workspaceId: activeWorkspace._id,
        workspaceName: activeWorkspace.name,
      })
    }
  }, [activeWorkspace, userWorkspaces])

  // Set an active workspace (mutation)
  const { mutate: toggleActiveWorkspace } = useMutation({
    mutationFn: setActiveWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: (error) => {
      console.error("Error setting active workspace:", error)
    },
  })

  // handle the workspace switch
  const handleWorkspaceToggle = async (value: string) => {
    const newWorkspace = userWorkspaces?.find(
      (workspace: WorkspaceData) => workspace.name === value
    )

    if (newWorkspace) {
      setSelectedWorkspace({
        workspaceId: newWorkspace._id,
        workspaceName: newWorkspace.name,
      })
    }
    toggleActiveWorkspace(selectedWorkspace?.workspaceId as string)
  }
  return {
    userWorkspaces,
    selectedWorkspace,
    handleWorkspaceToggle,
  }
}

export default useWorkspaceToggle
