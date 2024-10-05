import Link from "next/link";
import Pen from "@/public/img/icons/pen.svg";
import { Product } from "@/types/Product";
import DeleteProductBtn from "../DeleteProductBtn";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div className="p-6  border  border-gray-200  rounded-lg shadow relative">
      <div className="absolute top-2 right-2 flex gap-3">
        <Link href="/product/1/edit">
          <Pen />
        </Link>

        <DeleteProductBtn id={product?.id} cssClass={""}>
          {""}
        </DeleteProductBtn>
      </div>

      <Link href={`/product/${product?.id}`}>
        <h5 className="mb-2 text-2xl mt-1  font-bold tracking-tight">
          {product?.title}
        </h5>
      </Link>

      <p className="mb-3 font-normal"></p>

      <div className="flex justify-between mt-3">
        <div className="flex items-center justify-center">
          <span>{product?.category}</span>
        </div>

        <p>{product?.price}$</p>
      </div>
    </div>
  );
}
