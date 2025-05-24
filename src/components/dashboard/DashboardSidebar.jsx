import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Briefcase, FilePlus, Home, LogOut, Menu, User, X } from "lucide-react";
import useUserStore from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../utils/auth-api-client";
import { toast } from "react-toastify";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "My Applications",
    href: "/dashboard/applications",
    icon: Briefcase,
  },
  {
    title: "Add Application",
    href: "/dashboard/add-application",
    icon: FilePlus,
  },
  {
    title: "My Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function DashboardSidebar() {
  const { resetUser } = useUserStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isSuccess, data } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out successfully");
      resetUser();
      navigate("/login", { replace: true });
    }
  }, [data?.message, isSuccess, navigate, resetUser]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden absolute left-4 top-3 z-[20] rounded-md border border-slate-200 p-2 bg-white text-slate-700"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-200 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#2c4e85] transform transition-transform duration-200 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#254170]">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Briefcase className="mr-2 h-6 w-6" />
                Job Tracker
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#254170] transition-colors ${
                        location.pathname === item.href ? "bg-[#254170]" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-[#254170]">
              <button
                className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#254170] transition-colors"
                onClick={mutate}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:sticky md:inset-y-0 bg-[#2c4e85]">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-[#254170]">
            <Link to={"/"}>
              <h2 className="text-xl font-bold text-white flex items-center">
                <Briefcase className="mr-2 h-6 w-6" />
                <span>Job Tracker</span>
              </h2>
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#254170] transition-colors ${
                    location.pathname === item.href ? "bg-[#254170]" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-[#254170]">
            <button
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-[#254170] transition-colors"
              onClick={mutate}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
