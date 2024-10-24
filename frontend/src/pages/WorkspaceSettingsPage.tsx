import { WorkspaceSettingsContent } from "@/constants/WorkspaceContent"
import useUserRole from "@/hooks/useUserRole"
import useWorkspacesWithActive from "@/hooks/useWorkspaceWithActive"
import { UserData } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import EditWorkspaceForm from "@/components/workspace/EditWorkspaceForm"
const c = WorkspaceSettingsContent

const Settings = () => {
  const {currentWorkspace} = useWorkspacesWithActive()
  const queryClient = useQueryClient()

  const user = queryClient.getQueryData<UserData>(["user"])
  const isAdmin = useUserRole()

  return (
    <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8 no-scrollbar">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{currentWorkspace?.name} Workspace Settings</h1>
        <p className="text-xsm text-muted-foreground">{c.header.subHeading}</p>
      </div>

      {/* Workspace Data Section */}
      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 w-[600px] max-w-[600px] bg-white shadow-md">

        {/* Admin */}
        {isAdmin && 
          <EditWorkspaceForm workspace={currentWorkspace ? currentWorkspace : undefined}/>
        }         

        {/* Non Admin */}
        {
          !isAdmin && 
          <div>

          </div>
        }
      </div>

      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 w-[600px] max-w-[600px] bg-white shadow-md">
        Team members appear here
        <span className="font-bold tracking-tighter">Team Admins + Members</span>
        for current workspace
      </div>
    </div>
  )
}

export default Settings