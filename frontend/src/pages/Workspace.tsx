import WorkspaceOverview from "@/components/workspace/WorkspaceOverview"
import useGetCurrentWorkspace from "@/hooks/useGetCurrentWorkspace"

const Workspace = () => {
    const currentWorkspace = useGetCurrentWorkspace()
    
    if (!currentWorkspace) {
        return <div>No Workspaces, Create some first</div>
    }

    return (
        <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8">
            <div className="flex flex-col gap-2">
               <h1 className="text-3xl text-slate-800 font-[800] tracking-tight">{currentWorkspace?.name}</h1>
            </div>
            <WorkspaceOverview />
        </div>
    )
}

export default Workspace