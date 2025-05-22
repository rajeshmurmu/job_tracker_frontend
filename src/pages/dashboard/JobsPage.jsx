import { useCallback, useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../../utils/job-api-client";
import StatusFilterDropDown from "../../components/dashboard/StatusFilterDropDown";
import SortDropDown from "../../components/dashboard/SortDropDown";
import JobsPagination from "../../components/dashboard/JobsPagination";
import { useSearchParams } from "react-router";
import _config from "../../config/appConfig";

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      return await fetchJobs();
    },
    staleTime: 60 * 1000 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  });

  const filterAndSortJobs = useCallback(() => {
    // Filter and sort jobs
    const result = data?.jobs
      ?.filter((job) => {
        const matchesSearch =
          job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || job.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          const dateB = new Date(b.applied_date);
          const dateA = new Date(a.applied_date);
          // console.log();
          return dateB - dateA;
        } else if (sortBy === "oldest") {
          const dateB = new Date(b.applied_date);
          const dateA = new Date(a.applied_date);
          return dateA - dateB;
        } else if (sortBy === "company_name") {
          return a.company_name.localeCompare(b.company_name);
        }
        return 0;
      });

    // reset all state values and set filtered jobs
    setFilteredJobs(result);
    setTotalPages(Math.ceil(result?.length / _config.jobs_per_page));
    setCurrentPage(1);
  }, [data?.jobs, searchTerm, sortBy, statusFilter]);

  useEffect(() => {
    filterAndSortJobs();
  }, [searchTerm, sortBy, statusFilter, filterAndSortJobs]);

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

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("page", currentPage);
      return prev;
    });
  }, [currentPage, page, setSearchParams]);

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
        <h1 className="text-2xl font-bold tracking-tight">All Jobs</h1>
        <p className="text-slate-500">Manage and track your job applications</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
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
                placeholder="Search jobs by company name, position, or location..."
                className="w-full rounded-md border border-slate-200 pl-8 pr-3 py-2 text-sm outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {/* Status Filter Dropdown */}
              <StatusFilterDropDown
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />

              {/* Sort Dropdown */}
              <SortDropDown sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>

          {/* Jobs Table */}
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
                {filteredJobs
                  ?.slice(
                    (page - 1) * _config.jobs_per_page,
                    page * _config.jobs_per_page
                  )
                  .map((job) => (
                    <tr key={job?._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {job?.company_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {job?.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden md:table-cell">
                        {job?.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                            job?.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden md:table-cell">
                        {new Date(job?.applied_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                {filteredJobs?.length === 0 && (
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

          {/* Pagination */}
          <JobsPagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {/* {data?.jobs?.length > _config.jobs_per_page &&
            statusFilter === "All" && (
              <JobsPagination filteredJobs={data?.jobs} />
            )}

          {filteredJobs?.length > 0 && statusFilter !== "All" && (
            <JobsPagination filteredJobs={filteredJobs} />
          )} */}
        </div>
      </div>
    </div>
  );
}
