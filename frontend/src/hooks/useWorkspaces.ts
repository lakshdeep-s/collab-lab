import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllWorkspaces } from "@/lib/api";
import { WorkspaceData } from "@/types";
import { sortWorkspaces } from "@/lib/utils";

const useWorkspaces = () => {
  const queryClient = useQueryClient();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(undefined);

  const {data} = useQuery({
    queryKey: ['workspaces'],
    queryFn: getAllWorkspaces,
    staleTime: Infinity
  }) as {data: {workspaces: WorkspaceData[]}};

  useEffect(() => {
    if (data?.workspaces?.length) {
      const sortedWorkspaces = sortWorkspaces([...data.workspaces])

      const latestWorkspace = sortedWorkspaces[0]    
      setSelectedWorkspace(latestWorkspace.name)

      queryClient.setQueryData(['active-workspace'], latestWorkspace)
    }
  }, [data, queryClient])

  const handleWorkspaceChange = (value: string) => {
    setSelectedWorkspace(value);
    
    const selectedWorkspaceData = data?.workspaces.find(
      (workspace) => workspace.name === value
    );

    if (selectedWorkspaceData) {
      queryClient.setQueryData(["active-workspace"], selectedWorkspaceData);
    }
  };

  return {
    data,
    selectedWorkspace,
    handleWorkspaceChange,
  };
}

export default useWorkspaces