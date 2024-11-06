import { WorkspaceSettingsContent } from "@/constants/WorkspaceContent"
import useUserRole from "@/hooks/useUserRole"
import EditWorkspaceForm from "@/components/workspace/EditWorkspaceForm"
import TeamMemberList from "@/components/team/TeamMemberList"
import useGetActiveWorkspace from "@/hooks/useGetActiveWorkspace"
import useGetWorkspace from "@/hooks/useGetWorkspace"
const c = WorkspaceSettingsContent

const Settings = () => {
  const {currentWorkspaceId} = useGetActiveWorkspace()
  const {workspace: currentWorkspace} = useGetWorkspace(currentWorkspaceId || '')
  const isAdmin = useUserRole()

  return (
    <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8 no-scrollbar">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Workspace Settings <span className="text-brand">{currentWorkspace?.name}</span></h1>
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

      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 bg-white shadow-md max-w-[800px]">
        <TeamMemberList isAdminAccess={isAdmin} workspaceId={currentWorkspace?._id}/>
      </div>
    </div>
  )
}

export default Settings