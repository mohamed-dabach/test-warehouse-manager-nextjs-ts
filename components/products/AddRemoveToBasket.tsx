"use client";
import React from "react";
import AddToCard from "../svg/AddToCardIcon";
import {
  handleAddToBasket,
  handleDecrementBasket,
  handleIncrementBasket,
  handleRemoveFromBasket,
} from "@/lib/helpers/basket";
import { Product } from "@/types/Product";
import store, { BasketProduct } from "@/store";
import { useSnapshot } from "valtio";
import RemeveFromCard from "../svg/RemoveIcon";

export default function AddRemoveToBasket({ product }: { product: Product }) {
  const myStore = useSnapshot(store);

  const isInBasket: boolean = !!store.basket.find(
    (ele) => ele.id === product.id
  );

  // get the product from the basket to incrment or decrement quantity
  const productInBasket = myStore.basket.find(
    (prod: BasketProduct): boolean => prod.id === product.id
  );

  return (
    <div
      className={` m-0  rounded-lg relative text-gray-600 bg-white disabled:cursor-not-allowed disabled:bg-gray-300 px-1 py-[2px]`}
    >
      {!isInBasket ? (
        <button
          onClick={() => handleAddToBasket({ product })}
          className="flex gap-1"
          title="Add To Basket"
        >
          <AddToCard cssClass={"w-7 h-6 fill-gray-400 "} />
        </button>
      ) : (
        <div className="flex justify-center items-start">
          <button
            onClick={() => handleRemoveFromBasket({ product })}
            className="flex justify-center items-center"
            title="Remove From Basket"
          >
            <RemeveFromCard cssClass={"w-8 h-8 text-red-400 "} />
          </button>
          <div className="flex items-center border-gray-100">
            <button
              onClick={() =>
                handleDecrementBasket({ product: productInBasket })
              }
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              -
            </button>
            <div className="px-2">{productInBasket?.quantity}</div>
            <button
              onClick={() =>
                handleIncrementBasket({ product: productInBasket })
              }
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
