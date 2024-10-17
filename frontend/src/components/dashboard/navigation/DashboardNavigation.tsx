import SideNavigationToggle from "./SideNavigationToggle"
import UserOptions from "./UserOptions"

const DashboardNavigation = () => {
  return (
    <div className="w-full p-2 flex justify-between items-center">
      {/* Should not be visible at larger screen */}
      <SideNavigationToggle />

      {/* Profile actions toggle */}
      <div className="ml-auto">
        <UserOptions />
      </div>
    </div>
  )
}

export default DashboardNavigation