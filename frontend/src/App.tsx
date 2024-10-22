import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthProvider from "./providers/AuthProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import Team from "./pages/Team";
import AccountSettings from "./pages/AccountSettings";
import CreateWorkspacePage from "./pages/CreateWorkspacePage";
import Workspace from "./pages/Workspace";
import DevelopmentProvider from "./providers/DevelopmentProvider";

const router = createBrowserRouter([
  {

    path: "/",
    element: <AuthProvider />,
    // element: <DevelopmentProvider />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            path: "/",
            element: <Workspace />
          },
          {
            path: "/tasks",
            element: <Tasks />
          },
          {
            path: "/projects",
            element: <Projects/>
          },
          {
            path: "/settings",
            element: <Settings />
          },
          {
            path: "/team",
            element: <Team />
          },
          {
            path: "/account",
            element: <AccountSettings />
          },
          {
            path: '/new-workspace',
            element: <CreateWorkspacePage />
          }
        ]
      }
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
],
);

// Main App component
const App = () => {
  return <RouterProvider router={router} />
}

export default App