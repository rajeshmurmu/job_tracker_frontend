import { Navigate, Outlet, Route, Routes } from "react-router";
import { DashboardLayout } from "./pages/dashboard/DashboardLayout";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import JobsPage from "./pages/dashboard/JobsPage";
import AddJobPage from "./pages/dashboard/AddJobPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="add-job" element={<AddJobPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
