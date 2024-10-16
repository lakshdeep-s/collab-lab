// Content Imports
import { AuthHeaderContent } from "@/constants/AuthContent"

// Component Imports
import SignupForm from "@/components/auth/SignupForm"
import { NavLink } from "react-router-dom"

const c = AuthHeaderContent

const SignupPage = () => {
  return (
    <div className="centered-fullscreen min-h-screen font-primary">
      <div className="p-4 rounded-lg form-card">
        {/* Header Content */}
        <div className="flex flex-col text-center">
          <h1 className="text-[1.5rem] tracking-tighter font-bold">{c.SignupForm.header}</h1>
          <p className="text-xsm">{c.SignupForm.subheader}</p>
        </div>

        {/* Actual Form */}
        <SignupForm />

        {/* Footer */}
        <span className="text-xsm">
          Already have an account? <NavLink to="/login" className="hover:underline font-semibold">{c.SignupForm.linkText}</NavLink>
        </span>
      </div>
    </div>
  )
}

export default SignupPage
