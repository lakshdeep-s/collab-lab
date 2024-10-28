// Content Imports
import { AuthHeaderContent } from "@/constants/AuthContent"

// Component Imports
import SignupForm from "@/components/auth/SignupForm"
import { NavLink } from "react-router-dom"
import { RiAccountCircleFill } from "react-icons/ri";

const c = AuthHeaderContent

const SignupPage = () => {
  return (
    <div className="centered-fullscreen min-h-screen font-primary">
      <div className="p-6 rounded-lg form-card">
        {/* Header Content */}
        <div className="flex flex-col">
          <RiAccountCircleFill size={40} className="text-brand mx-auto mb-3"/>
          <h1 className="text-[1.5rem] tracking-tighter font-bold">{c.SignupForm.header}</h1>
          <p className="text-xsm">{c.SignupForm.subheader}</p>
        </div>

        {/* Actual Form */}
        <SignupForm />

        {/* Footer */}
        <span className="text-xsm text-muted-foreground">
          Already have an account? <NavLink to="/login" className="hover:underline font-semibold text-black">{c.SignupForm.linkText}</NavLink>
        </span>
      </div>
    </div>
  )
}

export default SignupPage
