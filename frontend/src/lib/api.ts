import { NewWorkSpaceData } from "@/components/workspace/NewWorkspaceForm"
import { MemberResponse} from "@/types"
import { API } from "@/config/apiClient"
import { queryClient } from "@/config/reactQuery"
import { AxiosResponse } from "axios"

export const getAuthenticatedUser = async () => {
  try {
    const response = await API.get("/user")
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export type LoginData = {
  email: string;
  password: string;
}

export const login = async (loginData: LoginData) => {
  try {
    const { email, password } = loginData
    const response = await API.post("/auth/login", { email, password })
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export type RegisterData = {
  username: string;
  email: string;
  password: string;
}

export const register = async (registerData: RegisterData) => {
  try {
    const { username, email, password } = registerData
    const response = await API.post("/auth/register", { username, email, password })
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const logout = async () => {
  try {
    const response = await API.post("/auth/logout")
    queryClient.clear()
    localStorage.clear()
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAllWorkspaces = async () => {
  try {
    const response = await API.get("/api/workspace/get-all-workspaces")
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}


export const createWorkspace = async (workspaceData: NewWorkSpaceData) => {
  try {
    const response = await API.post("/api/workspace/create-workspace", workspaceData)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const setActiveWorkspace = async (workspaceId: string) => {
  try {
    const response = await API.put(`/api/workspace/set-active/${workspaceId}`)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateWorkspace = async (workspaceId: string, workspaceData: NewWorkSpaceData) => {
  try {
    const response = await API.put(`/api/workspace/update-workspace/${workspaceId}`, workspaceData)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteWorkspace = async (workspaceId: string) => {
  try {
    const response = await API.delete(`/api/workspace/delete-workspace/${workspaceId}`)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAllMembers = async (workspaceId: string): Promise<MemberResponse> => {
  try {
    const response: AxiosResponse<MemberResponse> = await API.get<MemberResponse>(
      `/api/workspace/get-all-members/${workspaceId}`
    );
    return response.data; 
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerUserAndJoinTeam = async ({ username, email, password, token }: { username: string, email: string, password: string, token: string }) => {
  try {
    const response = await API.post(`/api/signup-and-join/${token}`, { username, email, password })
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject({ message: error.message })
    }
    return Promise.reject({ message: "An unknown error occurred" })
  }
}