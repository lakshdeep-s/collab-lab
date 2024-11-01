export type UserData = {
  userId: string
  username: string
  email: string
  lastLogin: Date
  currentWorkspace: string
}

export type WorkspaceData = {
  _id: string
  name: string
  description: string
  createdBy: UserData['userId']
  updatedAt: Date,
  createdAt: Date,
  admins: UserData['userId'][],
  members: UserData['userId'][],
  active: boolean
}

export interface TeamMember extends UserData{
  overdueTasks?: number
  completedTasks?: number
  pendingTasks?: number
  totalTasks?: number
  inviteStatus?: 'pending' | 'accepted' | 'rejected'
}

export type MemberResponse = {
  admins: TeamMember[]
  members: TeamMember[]
}