import { useState } from "react";

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message or redirect
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-slate-500">Manage your account settings</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden max-w-3xll">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-medium">Personal Information</h3>
          <p className="text-sm text-slate-500">
            Update your personal information and account settings
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
              <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src="https://avatar.iran.liara.run/public/boy"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <p className="text-sm text-slate-500">
                  Upload a new profile picture
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-slate-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  defaultValue="John"
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  defaultValue="Doe"
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
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
                defaultValue="john.doe@example.com"
                required
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
              />
            </div>

            <hr className="border-slate-200" />

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-sm text-slate-500">
                Update your password to keep your account secure
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-slate-700"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-slate-700"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end p-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2c4e85] hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
