import { Bell } from "lucide-react";
import useUserStore from "../../store/store";

export function TopBar() {
  const { user } = useUserStore((state) => state);
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 md:px-6 sticky top-0 z-10">
      <div className="ml-auto flex items-center space-x-4">
        <button className="text-slate-500 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </button>
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden cursor-pointer">
            <img
              src={user?.avatar || "https://avatar.iran.liara.run/public/boy"}
              alt="User"
              className="h-full w-full object-cover"
              // onError={(e) => {
              //   e.currentTarget.src = "";
              //   e.currentTarget.parentElement.innerHTML = "JD";
              // }}
            />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-slate-500">Welcome back!</p>
          </div>
        </div>
      </div>
    </header>
  );
}
