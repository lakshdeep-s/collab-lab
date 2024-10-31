// Content Imports
import { AuthHeaderContent } from "@/constants/AuthContent"

// Component Imports
import LoginForm from "@/components/auth/LoginForm"
import { NavLink } from "react-router-dom"
import { RiAccountCircleFill } from "react-icons/ri";

const c = AuthHeaderContent

const LoginPage = () => {
  return (
    <div className="centered-fullscreen min-h-screen font-primary bg-slate-50">
      <div className="p-6 rounded-lg form-card bg-white">
        {/* Header Content */}
        <div className="flex flex-col">
          <RiAccountCircleFill size={40} className="mx-auto mb-3 text-brand"/>
          <h1 className="text-[1.5rem] tracking-tighter font-bold">{c.LoginForm.header}</h1>
          <p className="text-xsm text-muted-foreground">{c.LoginForm.subheader}</p>
        </div>

        {/* Actual Form */}
        <LoginForm />

        {/* Footer */}
        <span className="text-xsm text-muted-foreground">
          Don’t have an account? <NavLink to="/signup" className="hover:underline font-semibold text-black">{c.LoginForm.linkText}</NavLink>
        </span>
      </div>
    </div>
  )
}

export default LoginPage
