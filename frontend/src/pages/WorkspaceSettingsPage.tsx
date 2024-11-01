import { WorkspaceSettingsContent } from "@/constants/WorkspaceContent"
import useUserRole from "@/hooks/useUserRole"
import EditWorkspaceForm from "@/components/workspace/EditWorkspaceForm"
import TeamMemberList from "@/components/team/TeamMemberList"
import useWorkspace from "@/hooks/useWorkspace"
const c = WorkspaceSettingsContent

const Settings = () => {
  const {activeWorkspace} = useWorkspace()
  const isAdmin = useUserRole()

  return (
    <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8 no-scrollbar">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Workspace Settings <span className="text-brand">{activeWorkspace?.name}</span></h1>
        <p className="text-xsm text-muted-foreground">{c.header.subHeading}</p>
      </div>

      {/* Workspace Data Section */}
      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4  max-w-[600px] bg-white shadow-md">

        {/* Admin */}
        {isAdmin && 
          <EditWorkspaceForm workspace={activeWorkspace ? activeWorkspace : undefined}/>
        }         

        {/* Non Admin */}
        {
          !isAdmin && 
          <EditWorkspaceForm workspace={activeWorkspace ? activeWorkspace : undefined}/>
        }
      </div>

      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 bg-white shadow-md max-w-[800px]">
        <TeamMemberList isAdminAccess={isAdmin} workspaceId={activeWorkspace?._id}/>
      </div>
    </div>
  )
}

export default Settings