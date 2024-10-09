import Link from "next/link";
import Pen from "@/public/img/icons/pen.svg";
import { Product } from "@/types/Product";
import DeleteProductBtn from "./DeleteProductBtn";
import EditProductBtn from "./EditProductBtn";
import { limitString } from "@/lib/helpers/product";
import Basket from "../../public/img/icons/basket.svg";
import { useSnapshot } from "valtio";
import store from "@/store";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const { basket } = useSnapshot(store);

  // the !! is to get the output as boolean
  const isInBasket: boolean = !!basket.find((ele) => ele.id === product.id);
  function handleAddToBasket() {
    store.basket = [{ ...product, quantity: 1 }, ...store.basket];
  }

  return (
    <div
      className="p-3 pt-8 border rouneded border-gray-200 rounded-lg shadow relative flex h-[230px] "
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute top-0 left-0 w-full z-10 h-full bg-[rgba(0,0,0,0.4)]"></div>
      <div className="absolute top-2 right-2 flex gap-3 z-20 justify-between  px-2 py-1 w-full">
        <button
          onClick={handleAddToBasket}
          disabled={isInBasket}
          className={` text-red-600 rounded-lg bg-white disabled:cursor-not-allowed disabled:bg-gray-300 px-0 py-0 ml-2`}
        >
          <Basket />
        </button>

        <div className="flex gap-2">
          <EditProductBtn id={product.id} cssClass="rounded" />
          <DeleteProductBtn id={product?.id} cssClass="rounded" />
        </div>
      </div>
      <div className="z-20 relative flex flex-col flex-1 mt-5 justify-between">
        <Link href={`/product/${product?.id}`}>
          <h5 className="mb-2 text-2xl mt-1 font-bold tracking-tight text-white z-10">
            {limitString({ phrase: product.title, limitCount: 30 })}
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
