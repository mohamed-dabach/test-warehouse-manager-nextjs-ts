"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface FilterButtonProps {
  item: string | null;
}

export default function FilterButton({ item }: FilterButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const handleClick = () => {
    if (item === null) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());

    // If the current category is already selected, remove it
    // Otherwise, set the new category
    if (category === item) {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", item);
    }

    // Construct the new URL - if there are no search params, just use "/"
    const newUrl = newSearchParams.toString()
      ? `/?${newSearchParams.toString()}`
      : "/";
    router.push(newUrl);
  };

  const isActive = category === item;

  return (
    <button
      onClick={handleClick}
      className={`
        capitalize px-3 py-2 cursor-pointer
        flex justify-center gap-2 items-center
        font-semibold border-2 rounded-xl
        transition-all hover:scale-[105%]
        ${
          isActive
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-gray-50 text-gray-600 border-gray-200 "
        }
      `}
    >
      {item}
    </button>
  );
}
