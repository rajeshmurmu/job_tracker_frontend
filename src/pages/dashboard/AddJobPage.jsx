import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
import DatePicker from "../../components/dashboard/DatePicker";
import { Loader2 } from "lucide-react";
import { vineResolver } from "../../utils/vine";
import { jobSchema } from "../../utils/jobSchema";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createJob } from "../../utils/job-api-client";
import { toast } from "react-toastify";
import { queryClient } from "../../main";

export default function AddJobPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      company_name: "",
      position: "",
      location: "",
      applied_date: null,
      status: "Saved",
      salary: "",
      job_url: "",
      notes: "",
    },
    resolver: vineResolver(jobSchema),
  });

  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: createJob,
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      queryClient.invalidateQueries(["fetch-jobs"]);
      toast.success(data?.message || "Job created successfully");
      navigate("/dashboard", { replace: true });
    }

    if (isError) {
      toast.error(error?.message || "Some error occurred");
    }
  }, [isSuccess, data, navigate, reset, error, isError]);

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
        <form onSubmit={handleSubmit((data) => mutate(data))}>
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
                  {...register("company_name", { required: true })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
                {errors.company_name && (
                  <p className="text-sm text-red-500">
                    {errors.company_name.message}
                  </p>
                )}
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
                  {...register("position", { required: true })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
                {errors.position && (
                  <p className="text-sm text-red-500">
                    {errors.position.message}
                  </p>
                )}
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
                  {...register("location", { required: true })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                />
                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
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
                  {...register("status", { required: true })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Saved" selected>
                    Saved
                  </option>
                </select>

                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-slate-700"
                >
                  Application Date (yyyy-MM-dd)
                </label>
                <DatePicker
                  control={control}
                  name="applied_date"
                  date={date}
                  setDate={setDate}
                />

                {errors.applied_date && (
                  <p className="text-sm text-red-500">
                    {errors.applied_date.message}
                  </p>
                )}
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

                {errors.salary && (
                  <p className="text-sm text-red-500">
                    {errors.salary.message}
                  </p>
                )}
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
                {...register("job_url", { required: false })}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
              />

              {errors.job_url && (
                <p className="text-sm text-red-500">{errors.job_url.message}</p>
              )}
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
                {...register("notes", { required: false })}
                placeholder="Add any additional notes about this job application"
                className="w-full min-h-[100px] rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
              />

              {errors.notes && (
                <p className="text-sm text-red-500">{errors.notes.message}</p>
              )}
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
              disabled={isPending}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2c4e85] hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending && (
                <Loader2 className="inline-block animate-spin h-4 w-4 mr-2" />
              )}
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
