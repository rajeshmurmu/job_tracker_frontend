import { Outlet, useNavigate } from "react-router";
import { DashboardSidebar } from "../../components/dashboard/DashboardSidebar";
import { TopBar } from "../../components/dashboard/TopBar";
import useUserStore from "../../store/store";
import { useEffect } from "react";

export function DashboardLayout() {
  const { user } = useUserStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login", { replace: true });
    }
  }, [navigate, user]);

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
