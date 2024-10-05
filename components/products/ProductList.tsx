import ProductListItem from "./ProductListItem";
import { Product } from "@/types/Product";

export interface ProductListProps {
  products: Product[] | null;
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto  px-4 py-10 container max-w-screen-xl m-auto">
        <h2 className="text-2xl text-center font-bold tracking-tight text-gray-600">
          Your Product List
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products ? (
            products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center">No product Found!</p>
          )}
        </div>
      </div>
    </div>
  );
}
