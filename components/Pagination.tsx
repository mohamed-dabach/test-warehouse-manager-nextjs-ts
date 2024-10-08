import React from "react";

export default function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  totalPages: number;
  setPage: (number: number) => void;
}) {
  return (
    <div className="mt-4 flex justify-center gap-2">
      <button
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
