import ProductCategoryList from "@/components/products/ProductCategoryList";
import ProductList from "@/components/products/ProductList";
import SearchProductInput from "@/components/products/SearchProductInput";
import axiosInstance from "@/lib/axios/axiosInstance";
import { Product } from "@/types/Product";
import React from "react";

interface SearchParams {
  searchParams: {
    category?: string;
    name?: string;
  };
}

export default async function Search({ searchParams }: SearchParams) {
  // get products based on category
  const url: string = searchParams.category
    ? `/products/category/${searchParams.category}`
    : "/products/";

  const products: Product[] | null = await axiosInstance
    .get<Product[]>(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log("There was an Error: " + err);
      return null;
    });

  // Filter products by name if search term exists
  const filteredProducts = searchParams.name
    ? products?.filter((product) =>
        product.title
          .toLowerCase()
          .includes(searchParams.name?.toLowerCase() || "")
      )
    : products;

  return (
    <div>
      <SearchProductInput />
      <ProductCategoryList />

      {!filteredProducts || filteredProducts?.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No products found!</div>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}
