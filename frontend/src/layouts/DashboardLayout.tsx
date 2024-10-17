import DashboardNavigation from "@/components/dashboard/navigation/DashboardNavigation"
import Sidenav from "@/components/dashboard/navigation/Sidenav"
import { queryClient } from "@/config/reactQuery"
import { Outlet } from "react-router-dom"
import { UserData } from "@/types"

const DashboardLayout = () => {
  const user: UserData | undefined = queryClient.getQueryData(["user"])

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidenav className="max-md:hidden" />

      <main className="flex flex-col w-full h-screen">
        <DashboardNavigation />

        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout