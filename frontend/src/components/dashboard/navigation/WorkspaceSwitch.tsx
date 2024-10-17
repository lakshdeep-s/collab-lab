import useWorkspaces from "@/hooks/useWorkspaces";
import WorkspaceSelect from "./WorkspaceSelect";
import { Button } from "@/components/ui/button";

const WorkspaceSwitch = () => {
  const { data, selectedWorkspace, handleWorkspaceChange } = useWorkspaces()

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