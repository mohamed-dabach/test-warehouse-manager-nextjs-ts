"use client";

import { Product } from "@/types/Product";
import axiosInstance from "@/lib/axios/axiosInstance";
import Error404 from "@/components/Error404";
import DeleteProductBtn from "@/components/products/DeleteProductBtn";
import Image from "next/image";
import EditProductBtn from "@/components/products/EditProductBtn";
import ViewProductSkeleton from "@/components/products/ViewProductSkelaton";
import { useEffect, useState } from "react";

interface ViewProductProps {
  params: {
    id: string;
  };
}

async function getProductById(id: string) {
  try {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
}

export default function ViewProduct({ params: { id } }: ViewProductProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true); // Fixed typo in setLoading

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      {loading && <ViewProductSkeleton />}
      {!loading && !product && <ViewProductSkeleton />}
      {product && (
        <div className="w-full">
          <div className="container max-w-2xl mx-auto p-2">
            <div className="flex justify-end w-full gap-4 mb-3">
              <EditProductBtn id={product.id} cssClass="px-3 py-2 border">
                Edit
              </EditProductBtn>
              <DeleteProductBtn cssClass="px-3 py-2 border" id={product.id}>
                Delete
              </DeleteProductBtn>
            </div>
            <div className="md:flex gap-2 justify-center items-center">
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={150}
              />
              <div className="relative"></div>
              <div>
                <h3 className="text-2xl font-bold mt-2">
                  {product.title} ({product.category})
                </h3>
                <p className="my-2">{product.description}</p>
                <p className="my-2 font-bold">${product.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
