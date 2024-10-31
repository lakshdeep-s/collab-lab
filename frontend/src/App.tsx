import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthProvider from "./providers/AuthProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/TasksPage";
import Projects from "./pages/ProjectsPage";
import Settings from "./pages/WorkspaceSettingsPage";
import Team from "./pages/TeamsPage";
import AccountSettings from "./pages/AccountSettingsPage";
import CreateWorkspacePage from "./pages/CreateWorkspacePage";
import Workspace from "./pages/WorkspacePage";
import InvitationPage from "./pages/InvitationPage";
import InvitationProvider from "./providers/InvitationProvider";

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
            element: <Projects />
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
  {
    path: "/invitation",
    element: <NotFound />,
  },
  {
    path: "/invitation/:token",
    element: <InvitationProvider />,
    children: [
      {
        index: true,
        element: <InvitationPage />
      }
    ],
    errorElement: <NotFound />
  }
]);

// Main App component
const App = () => {
  return <RouterProvider router={router} />
}

export default App