import React from "react";

export default function NetworkLoading({ description = "" }) {
  return (
    <div className="w-full h-[770px] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <Loader2 className="animate-spin size-14" color="#2c4e85" />
        <p>{description}</p>
      </div>
    </div>
  );
}
