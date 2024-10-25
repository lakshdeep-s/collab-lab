import axios from "axios"
import { queryClient } from "./reactQuery"
import { navigate } from "@/lib/navigation"

const options = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true
}

export const API = axios.create(options)
const AppErrorCodes = ['InvalidAccessToken', 'AccessTokenNotFound', 'AccessTokenExpired', 'RefreshTokenNotFound', 'InvalidRefreshToken']

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

API.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const {config, response} = error
        const {status, data} = response || {}

        if (status === 401 && AppErrorCodes.includes(data?.appErrorCode)) {
            try {
                await TokenRefreshClient.get("/auth/refresh")
                return API.request(config)
            } catch(error) {
                queryClient.clear()
                navigate("/login", {
                    state: {
                        redirectUrl: window.location.pathname
                    }
                })
            }
        }
        return Promise.reject(error)
    }
)

export default API