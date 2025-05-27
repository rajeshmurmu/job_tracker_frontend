import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ApplicationsPage from "./pages/dashboard/ApplicationsPage";
import AddApplicationPage from "./pages/dashboard/AddApplicationPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ContactPage from "./pages/ContactPage";
import PageLayout from "./pages/PageLayout";
import EditApplication from "./pages/dashboard/EditApplication";
import ViewApplicationPage from "./pages/dashboard/ViewApplicationPage";

const router = createBrowserRouter([
  // home routes
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
  // auth routes
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  // dashboard routes
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "applications",
        element: <ApplicationsPage />,
      },
      {
        path: "applications/:applicationId/edit",
        element: <EditApplication />,
      },
      {
        path: "applications/:applicationId",
        element: <ViewApplicationPage />,
      },
      {
        path: "add-application",
        element: <AddApplicationPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
