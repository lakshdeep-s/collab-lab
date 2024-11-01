import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllWorkspaces, getWorkspace, setActiveWorkspace } from "@/lib/api";
import { WorkspaceData } from "@/types";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useGetWorkspace from "./useGetWorkspace";

const useWorkspacesWithActive = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {user} = useAuth()
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(
    undefined
  )

  // Fetch all workspaces
  const { data: workspacesData } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
    staleTime: Infinity,
  }) as { data: { workspaces: WorkspaceData[] } };

  const {workspace} = useGetWorkspace(user?.currentWorkspace || "")

  // Mutation to activate a workspace
  const { mutate: activateWorkspace } = useMutation({
    mutationFn: setActiveWorkspace,
    onSuccess: async (_, workspaceId) => {
      console.log("Workspace activated successfully");
      
      // First invalidate the user query to get the new currentWorkspace
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      
      // Then invalidate other related queries
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
      
      // Explicitly prefetch the new workspace data
      await queryClient.prefetchQuery({
        queryKey: ['current-workspace', workspaceId],
        queryFn: () => getWorkspace(workspaceId)
      });
    },
    onError: (error) => {
      console.error("Error activating workspace:", error);
      // Reset selection on error
      setSelectedWorkspace(workspace?.name);
    },
  });

  // Update selectedWorkspace when workspace changes
  useEffect(() => {
    if (workspace) {
      setSelectedWorkspace(workspace.name)
    }
  }, [workspace]);

  // Handle switching workspaces
  const handleWorkspaceChange = async (value: string) => {
    const newWorkspace = workspacesData?.workspaces.find(
      (ws) => ws.name === value
    );

    if (newWorkspace) {
      setSelectedWorkspace(value);
      
      // Optimistically update the cache
      const previousData = queryClient.getQueryData(['current-workspace', user?.currentWorkspace]);
      queryClient.setQueryData(['current-workspace', newWorkspace._id], newWorkspace);
      
      try {
        await activateWorkspace(newWorkspace._id);
        navigate("/", { replace: true });
      } catch (error) {
        // Revert optimistic update on error
        queryClient.setQueryData(['current-workspace', user?.currentWorkspace], previousData);
        setSelectedWorkspace(workspace?.name);
      }
    }
  };

  return {
    data: workspacesData,
    currentWorkspace: workspace,
    selectedWorkspace,
    handleWorkspaceChange,
  };
};

export default useWorkspacesWithActive;