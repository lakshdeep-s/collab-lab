import WorkspaceSelect from "./WorkspaceSelect";
import { Button } from "@/components/ui/button";
import useWorkspace from "@/hooks/useWorkspace";

const WorkspaceSwitch = () => {
  const {currentWorkspace, userWorkspaces, handleWorkspaceSwitch} = useWorkspace()
  
  return userWorkspaces?.length ? (
    <WorkspaceSelect
      workspaces={userWorkspaces}
      selectedWorkspace={currentWorkspace}
      onWorkspaceChange={handleWorkspaceSwitch}
    />
  ) : (
    <Button className="w-[200px]">New Workspace</Button>
  )
}

export default WorkspaceSwitch