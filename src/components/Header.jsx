import { useState } from "react";
import { Link } from "react-router";
import {
  Briefcase,
  CheckCircle,
  BarChart2,
  Search,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import useUserStore from "../store/store";
export default function Header() {
  const { user } = useUserStore((state) => state);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-[#2c4e85]" />
              <span className="ml-2 text-xl font-bold text-slate-900">
                JobTracker
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#features"
                className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium"
              >
                Testimonials
              </a>
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2c4e85] hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85]"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium text-[#2c4e85] border border-[#2c4e85] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85]"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2c4e85] hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85]"
                  >
                    Dashboard
                  </Link>
                  <button className="px-4 py-2 rounded-md text-sm font-medium text-[#2c4e85] border border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85] cursor-pointer">
                    Logout
                  </button>
                </>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2c4e85]"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#2c4e85] hover:bg-[#254170]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              to="/login"
              className="block mt-2 px-3 py-2 rounded-md text-base font-medium text-[#2c4e85] border border-[#2c4e85] hover:bg-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
