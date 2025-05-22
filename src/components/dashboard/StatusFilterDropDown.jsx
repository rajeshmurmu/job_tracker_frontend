import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function StatusFilterDropDown({
  statusFilter,
  setStatusFilter,
}) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-[140px] rounded-md border border-slate-200 px-3 py-2 text-sm bg-white"
        onClick={() => setStatusMenuOpen(!statusMenuOpen)}
        onBlur={() =>
          setTimeout(() => {
            setStatusMenuOpen(false);
          }, 200)
        }
      >
        <span>{statusFilter === "All" ? "All Statuses" : statusFilter}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>
      {statusMenuOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          <div className="py-1">
            {["All", "Applied", "Interview", "Offer", "Rejected", "Saved"].map(
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
  );
}
