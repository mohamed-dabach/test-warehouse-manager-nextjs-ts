"use client";
import {
  handleDecrementBasket,
  handleIncrementBasket,
  handleRemoveFromBasket,
} from "@/lib/helpers/basket";
import store, { BasketProduct, Store } from "@/store";
import Image from "next/image";
import React from "react";
import { useSnapshot } from "valtio";

export default function Page() {
  const { basket, shippingPrice } = useSnapshot(store);
  const total: number =
    basket.length > 0
      ? Number(
          basket
            .reduce((acc, curr) => (acc += curr.price * curr.quantity), 0)
            .toFixed(2)
        )
      : 0;
  return (
    <div className=" bg-gray-100 min-h-[100vh] pt-20">
<h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3 flex flex-col">
          {basket.map((item) => (
            <CardItem item={item} key={item.id}  />
          ))}
          {basket.length < 1 && (
            <p c      lassName="text-center flex flex-1 justify-center items-center text-gray-500">
              No items, Go shoping{" "}
            </p>
          )}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${total}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">${shippingPrice}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>

            <div className="">
              <p className="mb-1 text-lg font-bold">
                ${total ? (total + shippingPrice).toFixed(2) : 0}USD
              </p>
              {/* <p className="text-sm text-gray-700">including VAT</p> */}
            </div>
          </div>
          <button
            disabled={basket.length < 1}
            className="mt-6 w-full rounded-md bg-blue-500 disabled:bg-blue-300 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}

function CardItem({ item }: { item: BasketProduct }) {
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <Image
        width={150}
        height={150}
        className="md:max-h-[150px] object-cover"
        src={item.image}
        alt={item.title}
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
          <p className="mt-1 text-xs text-gray-700">{item.category}</p>
        </div>
        <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <button
              onClick={() => handleDecrementBasket({ product: item })}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              -
            </button>
            <div className="px-2">{item.quantity}</div>
            <button
              onClick={() => handleIncrementBasket({ product: item })}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">{item.price}$</p>
            <svg
              onClick={() => handleRemoveFromBasket({ product: item })}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
