import { FC} from "react"
import NavigationLinks from "./NavigationLinks"
import { cn } from "@/lib/utils"

interface ISideNavProps{
  className?: string
}

const Sidenav: FC<ISideNavProps> = ({className}) => {
  return (
    <div className={cn("min-h-screen md:border-r max-md:w-full flex gap-6 md:p-4 py-4", className)}>
        <NavigationLinks />
    </div>
  )
}

export default Sidenav