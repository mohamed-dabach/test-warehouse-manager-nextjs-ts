// components/products/DynamicProductList.tsx
"use client";

import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "./ProductList";
import axiosInstance from "@/lib/axios/axiosInstance";
import Loading from "@/app/loading";

const getProducts = async ({
  category,
  name,
}: {
  name?: string;
  category?: string | null;
}) => {
  const url = `/products/` + (category ? `category/${category} ` : "");
  console.log(url);

  try {
    const response = await axiosInstance.get<Product[]>(url);
    const products = response.data;

    if (name && products) {
      const searchTerm = name.toLowerCase();
      return products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    return products;
  } catch (err) {
    console.log("There was an Error: " + err);
    return null;
  }
};

export default function DynamicProductList() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [page, setPage] = useState<number>(1);

  // set loading to true to prevent showing "no Products on the first load"
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const category = searchParams.get("category") || null;

      const name = searchParams.get("name") || undefined;

      const fetchedProducts = await getProducts({ name, category });
      setProducts(fetchedProducts);
      setLoading(false);
      console.log("hi")
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ProductList
      products={products}
      setPage={setPage}
      category={searchParams.get("category")}
    />
  );
}
