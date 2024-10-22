import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllWorkspaces, setActiveWorkspace } from "@/lib/api"
import { WorkspaceData } from "@/types"
import { useNavigate } from "react-router-dom"

const useWorkspacesWithActive = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    string | undefined
  >(undefined)

  // Fetch all workspaces
  const { data } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
    staleTime: Infinity,
  }) as { data: { workspaces: WorkspaceData[] } }

  // Find the currently active workspace
  const currentWorkspace = data?.workspaces.find(workspace => workspace.active) || null;

  // Mutation to activate a workspace
  const { mutate: activateWorkspace } = useMutation({
    mutationFn: setActiveWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
    onError: (error) => {
      console.error("Error activating workspace:", error)
    },
  })

    //  Set the intial workspace when an active workspace is available
  useEffect(() => {
    if (currentWorkspace) {
      setSelectedWorkspace(currentWorkspace.name)
    }
  }, [currentWorkspace])

  const handleWorkspaceChange = (value: string) => {
    setSelectedWorkspace(value)
    

    const workspace = data?.workspaces.find(ws => ws.name === value);

    if (workspace) {
      activateWorkspace(workspace._id)
      navigate("/", {
        replace: true,
      })
    }
  }

  return {
    data,
    currentWorkspace,
    selectedWorkspace,
    handleWorkspaceChange,
  }
}

export default useWorkspacesWithActive
