import { AccountSettingsContent } from "@/constants/AccountContent"
import { queryClient } from "@/config/reactQuery"
import { UserData } from "@/types"
import UserDataSection from "@/components/dashboard/account/UserDataSection"
import { extractUserInitials } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const c = AccountSettingsContent

export default function AccountSettings() {
  const user = queryClient.getQueryData<UserData>(["user"])

  return (
    <div className="h-full overflow-scroll px-4 font-primary flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{c.header.heading}</h1>
        <p className="text-xsm text-muted-foreground">{c.header.subHeading}</p>
      </div>

      {/* User Data Section */}
      <div className="px-6 py-6 rounded-md flex flex-col text-xsm gap-4 w-[600px] max-w-[600px] bg-white shadow-md">
        <div className="flex items-center">
          {/* User Profile View */}
          <Avatar className="h-16 w-16 mr-4">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {user ? extractUserInitials(user.username) : '??'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user?.username}</span>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <UserDataSection user={user} />
      </div>
    </div>
  )
}