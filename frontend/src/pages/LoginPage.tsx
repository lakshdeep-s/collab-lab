// Content Imports
import { AuthHeaderContent } from "@/constants/AuthContent"

// Component Imports
import LoginForm from "@/components/auth/LoginForm"
import { NavLink } from "react-router-dom"

const c = AuthHeaderContent

const LoginPage = () => {
  return (
    <div className="centered-fullscreen min-h-screen font-primary">
      <div className="p-4 rounded-lg form-card">
        {/* Header Content */}
        <div className="flex flex-col text-center">
          <h1 className="text-[1.5rem] tracking-tighter font-bold">{c.LoginForm.header}</h1>
          <p className="text-xsm">{c.LoginForm.subheader}</p>
        </div>

        {/* Actual Form */}
        <LoginForm />

        {/* Footer */}
        <span className="text-xsm">
          Don’t have an account? <NavLink to="/signup" className="hover:underline font-semibold">{c.LoginForm.linkText}</NavLink>
        </span>
      </div>
    </div>
  )
}

export default LoginPage
