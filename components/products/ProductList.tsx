import { useCallback, useRef, useState } from "react";
import ProductListItem from "./ProductListItem";
import { Product } from "@/types/Product";

export interface ProductListProps {
  products: Product[] | null;
  category: string | null;
  setPage: (page: number) => void;
}

export default function ProductList({
  products,
  category,
  setPage,
}: ProductListProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback((node: HTMLElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev: number) => (prev += 1));
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto  px-4 py-10 container max-w-screen-xl m-auto">
        <h2 className="text-2xl text-start font-bold tracking-tight text-gray-600">
          Products{category ? ` / ${category}` : ""}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products && products.length > 0 ? (
            products.map((product, i) => (
              <div
                ref={i === products.length - 1 ? lastProductElementRef : null}
                key={product.id}
              >
                <ProductListItem product={product} />
              </div>
            ))
          ) : (
            <p className="text-center">No product Found!</p>
          )}
        </div>
      </div>
    </div>
  );
}
