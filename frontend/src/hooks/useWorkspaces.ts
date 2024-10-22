import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllWorkspaces, setActiveWorkspace } from "@/lib/api";
import { WorkspaceData } from "@/types";

const useWorkspaces = () => {
  const queryClient = useQueryClient();

  const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(undefined);

  const { data } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getAllWorkspaces,
    staleTime: Infinity,
  }) as { data: { workspaces: WorkspaceData[] } };
  
  const activeWorkspace = data?.workspaces.find(workspace => workspace.active) || null;

  const {
    mutate: activateWorkspace,
  } = useMutation({
    mutationFn: setActiveWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error) => {
      console.error("Error activating workspace:", error);
    },
  });

  useEffect(() => {
    if (activeWorkspace) {
      setSelectedWorkspace(activeWorkspace.name);
    }
  }, [activeWorkspace]);

  const handleWorkspaceChange = (value: string) => {
    setSelectedWorkspace(value);

    const workspace = data?.workspaces.find(ws => ws.name === value);

    if (workspace) {
      activateWorkspace(workspace._id);
    }
  };

  return {
    data,
    selectedWorkspace,
    handleWorkspaceChange,
  };
};

export default useWorkspaces;
