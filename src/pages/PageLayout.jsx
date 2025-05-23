import { Outlet } from "react-router";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Header />

      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  );
}
