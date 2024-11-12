export type UserData = {
  _id: string
  username: string
  email: string
  lastLogin: Date
  currentWorkspace: string,
  }

export type WorkspaceData = {
  _id: string
  name: string
  description: string
  createdBy: UserData['_id']
  updatedAt: Date,
  createdAt: Date,
  admins: UserData['_id'][],
  members: UserData['_id'][],
  superAdmin: UserData['_id']
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
  members: TeamMember[],
  superAdmin: TeamMember
}