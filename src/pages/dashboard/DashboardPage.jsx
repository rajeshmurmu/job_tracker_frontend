import { Briefcase, Calendar, CheckCircle, Loader2 } from "lucide-react";
import BarChart from "../../components/dashboard/BarChart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../../utils/job-api-client";
import { useApplicationStore } from "../../store/store";
import { useEffect } from "react";
import useDashboardData from "../../hooks/useDashboardData";

export default function DashboardPage() {
  const { chartData, interviewCount, offerCount } = useDashboardData();
  const { setApplication } = useApplicationStore();
  const { data, isPending } = useQuery({
    queryKey: ["fetch-jobs"],
    queryFn: async () => {
      return await fetchJobs();
    },
    select: (data) => data?.jobs,
    staleTime: 60 * 1000 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setApplication(data);
    }
  }, [data, setApplication]);

  if (isPending) {
    return (
      <div className="w-full h-[770px] flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <Loader2 className="animate-spin size-14" color="#2c4e85" />
          <p>Please wait while getting your jobs</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-500">Track your job application progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium">Total Applied</h3>
            <Briefcase className="h-4 w-4 text-slate-500" />
          </div>
          <div className="p-4 pt-2">
            <div className="text-2xl font-bold">{data?.length}</div>
            <p className="text-xs text-slate-500">+12% from last month</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium">Interviews</h3>
            <Calendar className="h-4 w-4 text-slate-500" />
          </div>
          <div className="p-4 pt-2">
            <div className="text-2xl font-bold">{interviewCount}</div>
            <p className="text-xs text-slate-500">+2 scheduled this week</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium">Offers</h3>
            <CheckCircle className="h-4 w-4 text-slate-500" />
          </div>
          <div className="p-4 pt-2">
            <div className="text-2xl font-bold">{offerCount}</div>
            <p className="text-xs text-slate-500">1 pending response</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-medium">Application Activity</h3>
        </div>
        <div className="p-4">
          <div className="h-[300px]">
            <BarChart
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Number of Applications",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Month",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
