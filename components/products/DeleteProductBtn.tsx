"use client";
import React from "react";
import TrashCan from "../../public/img/icons/trashCan.svg";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios/axiosInstance";

export default function DeleteProductBtn({
  id,
  children,
  cssClass,
}: {
  id: number | string;
  children?: string | null;
  cssClass?: string | null;
}) {
  const Router = useRouter();

  async function handleDelete() {
    console.log("delete ");
    if (!window.confirm("Delete Product!")) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      Router.replace("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <button
        onClick={handleDelete}
        className={` text-red-600 rounded-lg bg-white px-2 py-1 flex gap-2 justify-center items-center ${cssClass}`}
      >
        {children}
        <TrashCan />
      </button>
    </>
  );
}
