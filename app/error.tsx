"use client";

import React from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="w-full h-[100vh] flex flex-col gap-4 justify-center items-center">
      <div className="text-xl font-semibold">
        {"Error Message: " + error.message || "Something went wrong!"}
      </div>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
