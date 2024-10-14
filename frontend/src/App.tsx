import {createBrowserRouter, RouterProvider} from "react-router-dom"   

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthProvider from "./providers/AuthProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      }
    ],
    errorElement: <NotFound />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

const App= () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App