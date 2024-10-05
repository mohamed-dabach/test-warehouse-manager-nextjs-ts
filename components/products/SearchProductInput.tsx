"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterButton() {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const searchValue = searchParams?.get("name");

  const [value, setValue] = useState<string>(searchValue || "");

  useEffect(() => {
    Router.push(`/product/search?category=${category}&name=${value}`);
  }, [value, Router, category]);

  return (
    <div className="w-full">
      <div className="container max-w-2xl m-auto">
        <div className="flex justify-center">
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className={`mt-1 block max-w-md rounded-md border px-3 py-2 `}
            placeholder="Name..."
          />
        </div>
      </div>
    </div>
  );
}
