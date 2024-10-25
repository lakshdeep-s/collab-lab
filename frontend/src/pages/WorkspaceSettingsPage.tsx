import { WorkspaceSettingsContent } from "@/constants/WorkspaceContent"
import useUserRole from "@/hooks/useUserRole"
import useWorkspacesWithActive from "@/hooks/useWorkspaceWithActive"
import EditWorkspaceForm from "@/components/workspace/EditWorkspaceForm"
import TeamMemberList from "@/components/team/TeamMemberList"
const c = WorkspaceSettingsContent

const Settings = () => {
  const {currentWorkspace} = useWorkspacesWithActive()
  const isAdmin = useUserRole()
  
  

  return (
    <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8 no-scrollbar">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">{currentWorkspace?.name} Workspace Settings</h1>
        <p className="text-xsm text-muted-foreground">{c.header.subHeading}</p>
      </div>

      {/* Workspace Data Section */}
      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4  max-w-[600px] bg-white shadow-md">

        {/* Admin */}
        {isAdmin && 
          <EditWorkspaceForm workspace={currentWorkspace ? currentWorkspace : undefined}/>
        }         

        {/* Non Admin */}
        {
          !isAdmin && 
          <EditWorkspaceForm workspace={currentWorkspace ? currentWorkspace : undefined}/>
        }
      </div>

      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 bg-white shadow-md">
        <TeamMemberList isAdminAccess={isAdmin}/>
      </div>
    </div>
  )
}

export default Settings