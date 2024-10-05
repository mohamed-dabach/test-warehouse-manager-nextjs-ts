import ProductCategoryList from "@/components/products/ProductCategoryList";
import ProductList from "@/components/products/ProductList";
import axiosInstance from "@/lib/axios/axiosInstance";
import { Product } from "@/types/Product";
import React from "react";


const getProducts = async () => {
  const products = await axiosInstance
    .get<Product[]>("/products/")
    .then((res) => res.data)
    .catch((err) => {
      console.log("There was an Error: " + err);
      return null;
    });
  return products;
};

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <ProductCategoryList />
      <ProductList products={products} />
    </>
  );
}
