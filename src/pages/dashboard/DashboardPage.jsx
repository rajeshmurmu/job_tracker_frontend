import { Briefcase, Calendar, CheckCircle } from "lucide-react";
import BarChart from "../../components/dashboard/BarChart";
export default function DashboardPage() {
  // Sample data for the chart
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Applications",
        data: [12, 19, 8, 15, 12, 18],
        backgroundColor: "#2c4e85",
      },
    ],
  };

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
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-slate-500">+12% from last month</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium">Interviews</h3>
            <Calendar className="h-4 w-4 text-slate-500" />
          </div>
          <div className="p-4 pt-2">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-slate-500">+2 scheduled this week</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between p-4 pb-2">
            <h3 className="text-sm font-medium">Offers</h3>
            <CheckCircle className="h-4 w-4 text-slate-500" />
          </div>
          <div className="p-4 pt-2">
            <div className="text-2xl font-bold">2</div>
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
