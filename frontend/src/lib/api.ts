import { API } from "@/config/apiClient"
import { queryClient } from "@/config/reactQuery"

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