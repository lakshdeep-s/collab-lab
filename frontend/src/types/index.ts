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
  admins: UserData['userId'][]
  members: UserData['userId'][]
}

