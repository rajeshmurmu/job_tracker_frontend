import { useEffect } from "react";
import { useLocation } from "react-router";

const routeTitles = {
  "/": "Job Tracker App – Manage Your Job Applications Effortlessly | Jobs-Tracker",
  "/dashboard": "Dashboard – Job Tracker App",
  "/applications": "My Applications – Job Tracker App",
  "/add-job": "Add Job – Job Tracker App",
  "/login": "Login – Job Tracker App",
  "/register": "Register – Job Tracker App",
};

export default function usePageTitle() {
  const location = useLocation();
  useEffect(() => {
    const title =
      routeTitles[location.pathname] ||
      "Job Tracker App – Manage Your Job Applications Effortlessly | Jobs-Tracker";
    document.title = title;
  }, [location.pathname]);
}
