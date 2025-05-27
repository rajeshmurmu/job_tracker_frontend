import { Outlet } from "react-router";
import { DashboardSidebar } from "../../components/dashboard/DashboardSidebar";
import { TopBar } from "../../components/dashboard/TopBar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
