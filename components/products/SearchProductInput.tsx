"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface SearchProductInputProps {
  defaultValue: string;
}

export default function SearchProductInput({
  defaultValue,
}: SearchProductInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const category = searchParams.get("category") || "";

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    if (category) {
      params.set("category", category);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="w-full">
      <div className="container max-w-2xl m-auto">
        <div className="flex justify-center">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={defaultValue}
            className={`mt-1 block max-w-md rounded-md border px-3 py-2 ${
              isPending ? "opacity-50" : ""
            }`}
            placeholder="Search Product Name"
          />
        </div>
      </div>
    </div>
  );
}
