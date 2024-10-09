"use client";

import { Product } from "@/types/Product";
import axiosInstance from "@/lib/axios/axiosInstance";
import Error404 from "@/components/Error404";
import DeleteProductBtn from "@/components/products/DeleteProductBtn";
import Image from "next/image";
import EditProductBtn from "@/components/products/EditProductBtn";
import ViewProductSkeleton from "@/components/products/ViewProductSkelaton";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import store from "@/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

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

  const { basket } = useSnapshot(store);

  // the !! is to get the output as boolean
  const isInBasket: boolean = !!basket.find((ele) => ele.id === product?.id);

  function handleAddToBasket() {
    store.basket = [{ ...product, quantity: 1 }, ...store.basket];
    toast.success("Added To Basket successfuly", { duration: 1000 });
  }
  return (
    <>
      {loading && !product && <ViewProductSkeleton />}
      {!loading && !product && <Error404 />}
      {product && (
        <div className="w-full">
          <div className="container max-w-2xl mx-auto p-2">
            <div className="flex justify-between w-full gap-4 mb-3">
              <button
                onClick={() => Router.back()}
                className="text-blue-400 underline flex justify-center items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                Back
              </button>
              <div className="flex gap-3">
                <EditProductBtn id={product.id} cssClass="px-3 py-2 border">
                  Edit
                </EditProductBtn>
                <DeleteProductBtn cssClass="px-3 py-2 border" id={product.id}>
                  Delete
                </DeleteProductBtn>
              </div>
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
            <button
              onClick={handleAddToBasket}
              disabled={isInBasket}
              className="mt-6  px-3 py-2 float-end rounded-md bg-blue-500 disabled:bg-blue-300 w-fit  font-medium text-blue-50 hover:bg-blue-600"
            >
              Add To Card
            </button>
          </div>
        </div>
      )}
    </>
  );
}
