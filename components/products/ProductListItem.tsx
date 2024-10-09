import Link from "next/link";
import Pen from "@/public/img/icons/pen.svg";
import { Product } from "@/types/Product";
import DeleteProductBtn from "./DeleteProductBtn";
import EditProductBtn from "./EditProductBtn";
import { limitString } from "@/lib/helpers/product";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div
      className="p-3 pt-8 border rouneded border-gray-200 rounded-lg shadow relative flex h-[200px] "
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute top-0 left-0 w-full z-10 h-full bg-[rgba(0,0,0,0.4)]"></div>
      <div className="absolute top-2 right-2 flex gap-3 z-20  px-2 py-1 ">
        <EditProductBtn id={product.id} cssClass="rounded" />

        <DeleteProductBtn id={product?.id} cssClass="rounded" />
      </div>
      <div className="z-20 relative flex flex-col flex-1 justify-between ">
        <Link href={`/product/${product?.id}`}>
          <h5 className="mb-2 text-2xl mt-1 font-bold tracking-tight text-white z-10">
            {limitString({ phrase: product.title,limitCount:40 })}
          </h5>
        </Link>

        <div className="flex justify-between mt-3 text-white z-10 ">
          <div className="flex items-center justify-center">
            <span>{product?.category}</span>
          </div>

          <p> {product?.price}$</p>
        </div>
      </div>
    </div>
  );
}
