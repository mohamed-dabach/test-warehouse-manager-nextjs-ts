"use client";
import { useRouter } from "next/navigation";
import {  useSearchParams } from "next/navigation";

interface FilterButtonProps {
  item: string | null;
}

export default function FilterButton({ item }: FilterButtonProps) {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  console.log(category);

  const handleClick = () => {
    if (item === null) return;
    Router.push("/product/search?category=" + item);
  };

  const isActive = category === item;

  return (
    <button
      disabled={isActive}
      onClick={handleClick}
      className={`capitalize disabled:cursor-not-allowed disabled:opacity-60 disabled:border-gray-200 disabled:bg-transparent px-3 py-2 cursor-pointer flex justify-center gap-2 items-center text-gray-600 font-semibold border-primary border-[2px] bg-gray-50 rounded-xl hover:scale-[105%] `}
    >
      {item}
    </button>
  );
}
