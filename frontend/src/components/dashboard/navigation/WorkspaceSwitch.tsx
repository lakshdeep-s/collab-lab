import WorkspaceSelect from "./WorkspaceSelect";
import { Button } from "@/components/ui/button";
import useWorkspaceToggle from "@/hooks/useWorkspaceToggle";
// import useWorkspacesWithActive from "@/hooks/useWorkspaceWithActive";

const WorkspaceSwitch = () => {
  const {userWorkspaces, handleWorkspaceToggle, selectedWorkspace} = useWorkspaceToggle()
  // const { data, selectedWorkspace, handleWorkspaceChange } = useWorkspacesWithActive()

  return userWorkspaces?.length ? (
    <WorkspaceSelect
      workspaces={userWorkspaces}
      selectedWorkspace={selectedWorkspace?.workspaceName}
      onWorkspaceChange={handleWorkspaceToggle}
    />
  ) : (
    <Button className="w-[200px]">New Workspace</Button>
  )
}

export default WorkspaceSwitch