import ProductListItem from "./ProductListItem";
import { Product } from "@/types/Product";

export interface ProductListProps {
  products: Product[] | null;
  category: string | null;
}

export default function ProductList({ products, category }: ProductListProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto  px-4 py-10 container max-w-screen-xl m-auto">
        <h2 className="text-2xl text-start font-bold tracking-tight text-gray-600">
          Products{category ? ` / ${category}` : ""}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products && products.length > 0 ? (
            products.map((product, i) => (
              <div key={product.id}>
                <ProductListItem product={product} />
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
