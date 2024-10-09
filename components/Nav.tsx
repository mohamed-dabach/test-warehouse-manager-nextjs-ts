"use client";
import Link from "next/link";
import { useState } from "react";
import Basket from "../public/img/icons/basket.svg";
import { useSnapshot } from "valtio";
import store from "@/store";

export default function Nav() {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const { basket } = useSnapshot(store);

  // close nav bar
  function handleCloseNav() {
    setToggleNav(false);
  }

  return (
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl relative container m-auto flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          onClick={handleCloseNav}
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            WM{" "}
          </span>
        </Link>
        <button
          onClick={() => setToggleNav((prev) => !prev)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            !toggleNav && "hidden"
          } w-full md:block md:w-auto md:me-14`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col gap-1 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
            <li>
              <Link
                onClick={handleCloseNav}
                href="/"
                className="block py-2 px-1   md:bg-transparent border-transparent border-b-2 hover:text-blue-300 md:hover:border-b-blue-500 md:pb-1  "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={handleCloseNav}
                href="/product/add"
                className="block py-2 px-1   md:bg-transparent border-transparent border-b-2 hover:text-blue-300 md:hover:border-b-blue-500 md:pb-1  "
                aria-current="page"
              >
                Add Product
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href={"/panier"}
          className="flex absolute top-5 right-16 md:right-4 justify-start items-center p-0 border-2 hover:border-gray-300 rounded-lg"
        >
          <div className="relative">
            <div className="absolute bottom-[10px] left-[20px] text-sm rounded-[50%] bg-blue-400 text-white w-6 h-6 flex justify-center items-center">
              {basket.length || 0}
            </div>
          </div>
          <Basket />
        </Link>
      </div>
    </nav>
  );
}
