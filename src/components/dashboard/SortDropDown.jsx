import { ArrowUpDown, ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function SortDropDown({ sortBy, setSortBy }) {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm bg-white"
        onClick={() => setSortMenuOpen(!sortMenuOpen)}
        onBlur={() =>
          setTimeout(() => {
            setSortMenuOpen(false);
          }, 200)
        }
      >
        <div className="flex items-center ">
          <ArrowUpDown className="mr-2 h-4 w-4 hidden md:block" />
          <span>Sort by {sortBy}</span>
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
                setSortBy("company_name");
                setSortMenuOpen(false);
              }}
            >
              Company name
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
