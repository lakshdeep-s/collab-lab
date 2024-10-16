import { Navigate, Outlet} from "react-router-dom"
import { RiLoader2Fill } from "react-icons/ri"
import useAuth from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { setNavigate } from "@/lib/navigation"

const AuthProvider = () => {
  const {user, isLoading} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])

  return isLoading ? <div className="min-h-screen centered-fullscreen">
    <RiLoader2Fill size={30} className="animate-spin"/>
  </div> : user ? <Outlet/> :   
  <Navigate 
    to="/login"
    replace
    state={{
      redirectUrl: window.location.pathname
    }}
  />
}

export default AuthProvider