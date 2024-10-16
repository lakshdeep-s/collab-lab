import DashboardNavigation from "@/components/dashboard/DashboardNavigation"
import Sidenav from "@/components/dashboard/Sidenav"
import { queryClient } from "@/config/reactQuery"
import { Outlet } from "react-router-dom"
import { UserData } from "@/types"

const DashboardLayout = () => {
  const user: UserData | undefined = queryClient.getQueryData(["user"])

  return (
    <div className="min-h-screen flex">
      <Sidenav className="max-md:hidden"/>
      
      <main className="flex flex-col w-full h-screen">
        <DashboardNavigation/>

        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout