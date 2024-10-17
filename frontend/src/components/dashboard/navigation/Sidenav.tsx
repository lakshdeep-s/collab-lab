import { FC } from "react"
import NavigationLinks from "./NavigationLinks"
import { cn } from "@/lib/utils"
import WorkspaceSwitch from "./WorkspaceSwitch"
import { AiOutlinePartition } from "react-icons/ai";
import { RiAddCircleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

interface ISideNavProps {
  className?: string
}

const Sidenav: FC<ISideNavProps> = ({ className }) => {
  return (
    <div className={cn("min-h-screen max-md:w-full flex flex-col gap-6 md:p-4 py-4 font-primary", className)}>
      <div className="flex gap-2 items-center mb-4">
        <AiOutlinePartition size={28} className="text-brand" /><span className="text-xl text-slate-800 font-bold tracking-tighter">Collab Lab</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xsm font-mediumg text-muted-foreground flex gap-2 items-center">WORKSPACES <NavLink to={'/new-workspace'}>
          <RiAddCircleFill size={18} />
        </NavLink></span>
        {/* Workspaces Selector */}
        <WorkspaceSwitch />
      </div>

      <NavigationLinks />
    </div>
  )
}

export default Sidenav