import { useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

// Sample job data
const jobs = [
  {
    id: 1,
    company: "Acme Inc",
    position: "Frontend Developer",
    location: "New York, NY",
    status: "Applied",
    appliedDate: "2023-05-01",
  },
  {
    id: 2,
    company: "Globex Corp",
    position: "Full Stack Engineer",
    location: "Remote",
    status: "Interview",
    appliedDate: "2023-05-05",
  },
  {
    id: 3,
    company: "Stark Industries",
    position: "UI/UX Designer",
    location: "San Francisco, CA",
    status: "Offer",
    appliedDate: "2023-04-20",
  },
  {
    id: 4,
    company: "Wayne Enterprises",
    position: "Product Manager",
    location: "Chicago, IL",
    status: "Rejected",
    appliedDate: "2023-04-15",
  },
  {
    id: 5,
    company: "Umbrella Corp",
    position: "Backend Developer",
    location: "Austin, TX",
    status: "Applied",
    appliedDate: "2023-05-10",
  },
  {
    id: 6,
    company: "Cyberdyne Systems",
    position: "DevOps Engineer",
    location: "Seattle, WA",
    status: "Interview",
    appliedDate: "2023-04-28",
  },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
        );
      } else if (sortBy === "company") {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Interview":
        return "bg-amber-100 text-amber-800";
      case "Offer":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Jobs</h1>
        <p className="text-slate-500">Manage and track your job applications</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-medium">Job Applications</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute left-2.5 top-2.5 text-slate-500">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full rounded-md border border-slate-200 pl-8 pr-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {/* Status Filter Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center justify-between w-[140px] rounded-md border border-slate-200 px-3 py-2 text-sm bg-white"
                  onClick={() => setStatusMenuOpen(!statusMenuOpen)}
                >
                  <span>
                    {statusFilter === "All" ? "All Statuses" : statusFilter}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {statusMenuOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
                    <div className="py-1">
                      {["All", "Applied", "Interview", "Offer", "Rejected"].map(
                        (status) => (
                          <button
                            key={status}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                            onClick={() => {
                              setStatusFilter(status);
                              setStatusMenuOpen(false);
                            }}
                          >
                            {status === "All" ? "All Statuses" : status}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm bg-white"
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                >
                  <div className="flex items-center">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <span>Sort</span>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {sortMenuOpen && (
                  <div className="absolute right-0 z-10 mt-1 w-48 rounded-md border border-slate-200 bg-white shadow-lg">
                    <div className="py-1">
                      <button
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                        onClick={() => {
                          setSortBy("newest");
                          setSortMenuOpen(false);
                        }}
                      >
                        Newest first
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                        onClick={() => {
                          setSortBy("oldest");
                          setSortMenuOpen(false);
                        }}
                      >
                        Oldest first
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                        onClick={() => {
                          setSortBy("company");
                          setSortMenuOpen(false);
                        }}
                      >
                        Company name
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Applied Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {job.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {job.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden md:table-cell">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden md:table-cell">
                      {new Date(job.appliedDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {filteredJobs.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-sm text-slate-500"
                    >
                      No jobs found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-current="page"
                className="z-10 bg-[#2c4e85] border-[#2c4e85] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                1
              </a>
              <a
                href="#"
                className="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                2
              </a>
              <a
                href="#"
                className="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                3
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
