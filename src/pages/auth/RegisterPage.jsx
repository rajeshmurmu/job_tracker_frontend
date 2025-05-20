"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Briefcase } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - in a real app, you would validate credentials
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
        <div className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-2">
            <Briefcase className="h-10 w-10 text-[#2c4e85]" />
          </div>
          <h2 className="text-2xl font-bold">Job Tracker</h2>
          <p className="text-sm text-slate-500">
            Enter your credentials to create an account
          </p>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Confirm Password
                </label>

                <input
                  id="password"
                  type="text"
                  placeholder="********"
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-[#2c4e85] px-4 py-2 text-sm font-medium text-white hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-[#2c4e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2c4e85] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
