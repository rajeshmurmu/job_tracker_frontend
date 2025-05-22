import { ChevronLeft, ChevronRight } from "lucide-react";
import _config from "../../config/appConfig";

export default function JobsPagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    totalPages > 1 && (
      <div className="mt-4 flex items-center justify-center">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (data) =>
              currentPage === data ? (
                <button
                  key={data}
                  aria-current="page"
                  className="z-10 bg-[#2c4e85] border-[#2c4e85] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  onClick={() => setCurrentPage(data)}
                >
                  {data}
                </button>
              ) : (
                <button
                  key={data}
                  className="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  onClick={() => setCurrentPage(data)}
                >
                  {data}
                </button>
              )
          )}
          <button
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    )
  );
}
