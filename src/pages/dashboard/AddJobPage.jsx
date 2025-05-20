import { useState } from "react";
import { useNavigate } from "react-router";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

export default function AddJobPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard/jobs");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Job</h1>
        <p className="text-slate-500">Add a new job application to track</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden max-w-3xll">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-medium">Job Details</h3>
          <p className="text-sm text-slate-500">
            Enter the details of the job you&apos;ve applied for
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-slate-700"
                >
                  Company
                </label>
                <input
                  id="company"
                  placeholder="Company name"
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-slate-700"
                >
                  Position
                </label>
                <input
                  id="position"
                  placeholder="Job title"
                  required
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-slate-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  placeholder="City, State or Remote"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-slate-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  defaultValue="Applied"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-slate-700"
                >
                  Application Date
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="w-full flex items-center justify-start rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                    <span
                      className={date ? "text-slate-900" : "text-slate-500"}
                    >
                      {date ? format(date, "PPP") : "Select date"}
                    </span>
                  </button>
                  {showDatePicker && (
                    <div className="absolute z-10 mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-2">
                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={(day) => {
                          setDate(day);
                          setShowDatePicker(false);
                        }}
                        className="bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-slate-700"
                >
                  Salary (Optional)
                </label>
                <input
                  id="salary"
                  placeholder="e.g. $75,000"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-slate-700"
              >
                Job URL (Optional)
              </label>
              <input
                id="url"
                type="url"
                placeholder="https://example.com/job"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-slate-700"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                placeholder="Add any additional notes about this job application"
                className="w-full min-h-[100px] rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
              />
            </div>
          </div>
          <div className="flex justify-between p-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2c4e85] hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
