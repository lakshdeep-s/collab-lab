import WorkspaceSelect from "./WorkspaceSelect";
import { Button } from "@/components/ui/button";
import useWorkspacesWithActive from "@/hooks/useWorkspaceWithActive";

const WorkspaceSwitch = () => {
  const { data, selectedWorkspace, handleWorkspaceChange } = useWorkspacesWithActive()

  return data?.workspaces.length ? (
    <WorkspaceSelect
      workspaces={data.workspaces}
      selectedWorkspace={selectedWorkspace}
      onWorkspaceChange={handleWorkspaceChange}
    />
  ) : (
    <Button className="w-[200px]">New Workspace</Button>
  )
}

export default WorkspaceSwitch