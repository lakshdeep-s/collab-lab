import { WorkspaceSettingsContent } from "@/constants/WorkspaceContent"
import useWorkspacesWithActive from "@/hooks/useWorkspaceWithActive"
import { UserData } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
const c = WorkspaceSettingsContent

const Settings = () => {
  const {currentWorkspace} = useWorkspacesWithActive()
  const queryClient = useQueryClient()

  const user = queryClient.getQueryData<UserData>(["user"])

  return (
    <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8 no-scrollbar">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{c.header.heading}</h1>
        <p className="text-xsm text-muted-foreground">{c.header.subHeading}</p>
      </div>

      {/* Workspace Data Section */}
      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 w-[600px] max-w-[600px] bg-white shadow-md">
        <div className="flex flex-col">
          <h2 className="text-[1rem] font-semibold tracking-tight">{currentWorkspace?.name} Workspace</h2>
          <span className="text-xsm text-muted-foreground">
            Created by <span className="text-brand">{user?.username}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Settings