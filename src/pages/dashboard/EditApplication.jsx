import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { vineResolver } from "../../utils/vine";
import { applicationSchema } from "../../utils/applicationSchema";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import DatePicker from "../../components/dashboard/DatePicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchApplication,
  updateApplication,
} from "../../utils/application-api-client";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { queryClient } from "../../main";
export default function EditApplication() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const { data: application, isPending: applicationLoading } = useQuery({
    queryKey: ["get-aplication", applicationId],
    queryFn: async () => {
      return await fetchApplication(applicationId);
    },
    select: (data) => data?.application,
  });
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      company_name: "",
      position: "",
      location: "",
      applied_date: date || application?.applied_date,
      status: "Applied",
      salary: "",
      job_url: "",
      notes: "",
    },
    resolver: vineResolver(applicationSchema),
  });

  const {
    mutate: updateApplicationMutate,
    data: updateData,
    isSuccess: isUpdateSuccess,
    isPending: updating,
    isError: isUpdateError,
    error,
  } = useMutation({
    mutationKey: ["update-application", applicationId],
    mutationFn: async (data) => {
      return await updateApplication(applicationId, {
        ...data,
        applied_date: date,
      });
    },
  });

  useEffect(() => {
    if (application) {
      setDate(format(new Date(application?.applied_date), "yyyy-MM-dd"));
      reset({
        company_name: application?.company_name || "",
        position: application?.position || "",
        location: application?.location || "",
        // applied_date: new Date(date).toISOString().split("T")[0],
        applied_date: date || application?.applied_date,
        status: application?.status || "Applied",
        salary: application?.salary || "",
        job_url: application?.job_url || "",
        notes: application?.notes || "",
      });
    }
  }, [application, applicationId, date, reset]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.message || "Application updated successfully");
      navigate("/dashboard");
    }

    if (isUpdateError) {
      toast.error(error?.message);
    }
  }, [
    error?.message,
    isUpdateError,
    isUpdateSuccess,
    navigate,
    updateData?.message,
  ]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["applications"],
      exact: true,
    });
  }, [updateData]);

  if (applicationLoading) {
    return (
      <div className="w-full h-[770px] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <Loader2 className="animate-spin size-14" color="#2c4e85" />
          <p>Please wait while fetching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Application</h1>
        <p className="text-slate-500">
          Edit your application details, after you are done click save Job
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden max-w-3xll">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-medium">Job Details</h3>
          <p className="text-sm text-slate-500">
            Enter the details of the job you&apos;ve applied for
          </p>
        </div>
        <form onSubmit={handleSubmit((data) => updateApplicationMutate(data))}>
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
                  defaultValue={application?.status || "Applied"}
                  {...register("status", { required: true })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Saved">Saved</option>
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
              disabled={updating}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2c4e85] hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating && (
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
