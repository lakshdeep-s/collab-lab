export type UserData = {
  userId: string
  username: string
  email: string
  lastLogin: Date
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
  role?: 'admin' | 'member'
}

