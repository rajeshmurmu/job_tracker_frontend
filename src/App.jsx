import { Navigate, Outlet, Route, Routes } from "react-router";
import { DashboardLayout } from "./pages/dashboard/DashboardLayout";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import JobsPage from "./pages/dashboard/JobsPage";
import AddJobPage from "./pages/dashboard/AddJobPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import usePageTitle from "./utils/usePageTitle";
import ContactPage from "./pages/ContactPage";
import PageLayout from "./pages/PageLayout";

function App() {
  usePageTitle();
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="applications" element={<JobsPage />} />
        <Route path="add-application" element={<AddJobPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
