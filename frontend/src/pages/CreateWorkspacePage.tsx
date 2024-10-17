import NewWorkspaceSection from "@/components/workspace/NewWorkspaceSection"
import { NewWorkspaceContent } from "@/constants/WorkspaceContent"
const c = NewWorkspaceContent
const CreateWorkspacePage = () => {
  return (
    <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8">

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{c.header.heading}</h1>
        <p className="text-xsm text-muted-foreground">{c.header.subHeading}</p>
      </div>

      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 bg-white shadow-md">
        <NewWorkspaceSection/>
      </div>
    </div>
  )
}

export default CreateWorkspacePage