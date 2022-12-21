import { useRoutes } from "react-router-dom";
import AuthGuard from "../pages/AuthGuard";
import Home from "../components/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import OtherComponent from "../components/OtherComponent";

const Router = () => useRoutes(
  [
    {
      path: '/',
      element: <AuthGuard />,
      children: [
        { element: <Home />, index: true },
        {
          path: 'other',
          element: <OtherComponent />
        }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/signup',
      element: <SignupPage />
    }
  ]
)

export default Router