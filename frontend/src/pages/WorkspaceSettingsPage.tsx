import { WorkspaceSettingsContent } from "@/constants/WorkspaceContent"
import useUserRole from "@/hooks/useUserRole"
import EditWorkspaceForm from "@/components/workspace/EditWorkspaceForm"
import TeamMemberList from "@/components/team/TeamMemberList"
import useGetActiveWorkspace from "@/hooks/useGetActiveWorkspace"
import useGetWorkspace from "@/hooks/useGetWorkspace"
import ViewWorkspaceDetails from "@/components/workspace/ViewWorkspaceDetails"
const c = WorkspaceSettingsContent

const Settings = () => {
  const {currentWorkspaceId} = useGetActiveWorkspace()
  const {workspace: currentWorkspace, isLoading: workspaceLoading} = useGetWorkspace(currentWorkspaceId || '')
  const {isAdmin, isSuperAdmin} = useUserRole()

  if (!currentWorkspace || workspaceLoading) {
    return <div>Loading...</div>
  }

  console.log(currentWorkspace?._id)

  return (
    <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8 no-scrollbar">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Workspace Settings <span className="text-brand">{currentWorkspace?.name}</span></h1>
        <p className="text-xsm text-muted-foreground">{c.header.subHeading}</p>
      </div>

      {/* Workspace Data Section */}
      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4  max-w-[600px] bg-white shadow-md">
        {/* Admin */}
        {isSuperAdmin ? (
          <EditWorkspaceForm workspace={currentWorkspace} />
        ) : (
          <ViewWorkspaceDetails workspace={currentWorkspace} />
        )}
      </div>

      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 bg-white shadow-md max-w-[800px]">
        <TeamMemberList isAdminAccess={isAdmin} isSuperAdminAccess={isSuperAdmin} workspaceId={currentWorkspace?._id}/>
      </div>
    </div>
  )
}

export default Settings