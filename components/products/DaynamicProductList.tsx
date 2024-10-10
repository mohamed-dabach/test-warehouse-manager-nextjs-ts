"use client";

import { Product } from "@/types/Product";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "./ProductList";
import Loading from "@/app/loading";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "../Pagination";

interface ProductsResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
}

interface GetProductsProps {
  name?: string | null;
  category?: string | null;
  page: number;
  limit: number;
}

const getProducts = async ({
  category,
  name,
  page,
  limit,
}: GetProductsProps) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (name) params.append("name", name);
    if (category) params.append("category", category);

    const url = `/api/products?${params.toString()}`;
    const response = await axios.get<ProductsResponse>(url);

    return {
      products: response.data.products,
      pagination: response.data.pagination,
    };
  } catch (err) {
    console.error("Error fetching products:", err);
    return {
      products: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        limit,
      },
    };
  }
};

export default function DynamicProductList() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [hasMore, setHasMore] = useState<boolean>(true);

  // products limit
  const limit = 8;

  const fetchProducts = useCallback(
    async (pageNumber: number) => {
      try {
        setLoading(true);
        const category = searchParams.get("category");
        const name = searchParams.get("name");
        const { products: fetchedProducts, pagination } = await getProducts({
          name,
          category,
          page: pageNumber,
          limit,
        });

        setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);

        setHasMore(pageNumber < pagination.totalPages);
      } catch (error) {
        console.error("Error in fetchProducts:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [searchParams]
  );

  // Initial load
  useEffect(() => {
    setPage(1);
    setProducts([]);
    fetchProducts(1);
  }, [searchParams, fetchProducts]);


  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    await fetchProducts(nextPage);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          products.length > 0 && (
            <p className="text-center text-gray-500 my-4">
              No more products to load.
            </p>
          )
        }
      >
        <ProductList
          products={products}
          category={searchParams.get("category")}
          loading={loading && !products?.length}
        />
      </InfiniteScroll>

      {/* {products.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPages={9} />
      )} */}
      
    </div>
  );
}
