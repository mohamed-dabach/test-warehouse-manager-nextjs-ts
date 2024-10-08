import axiosInstance from "@/lib/axios/axiosInstance";
import { Product } from "@/types/Product";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get all query parameters
    const name = searchParams.get("name");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");

    const start = (page - 1) * limit;

    // Construct the base URL
    const url = category ? `/products/category/${category}` : "/products";

    const response = await axiosInstance.get(url);
    let products: Product[] = response.data;

    // Apply name filter if provided
    if (name) {
      const searchTerm = name.toLowerCase();
      products = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    // Calculate total items and pages
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / limit);

    // Apply pagination
    const paginatedProducts = products.slice(start, start + limit);

    return Response.json({
      status: "success",

      products: paginatedProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        limit,
      },
    });
  } catch (err) {
    console.error("Error in GET products:", err);
    return Response.json(
      {
        status: "fail",
        error: err instanceof Error ? err.message : "Unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
