import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Controller } from "react-hook-form";

export default function DatePicker({ date, setDate, control, name }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="w-full flex items-center justify-start rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#2c4e85] focus:ring-1 focus:ring-[#2c4e85]"
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
        <span className={date ? "text-slate-900" : "text-slate-500"}>
          {date ? format(date, "yyyy-MM-dd") : "Select date"}
        </span>
      </button>
      {showDatePicker && (
        <div className="absolute z-10 mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-2">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <DayPicker
                mode="single"
                selected={field.value}
                formatters={{ format: (date) => format(date, "yyyy-MM-dd") }}
                onSelect={(date) => {
                  field.onChange(format(date, "yyyy-MM-dd"));
                  setDate(format(date, "yyyy-MM-dd"));
                  setShowDatePicker(false);
                }}
                onDayBlur={() => setShowDatePicker(false)}
                className="bg-white"
              />
            )}
          />
        </div>
      )}
    </div>
  );
}
