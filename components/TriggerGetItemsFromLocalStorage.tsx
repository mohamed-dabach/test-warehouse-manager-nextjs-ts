"use client";
import store from "@/store";
import React from "react";
import { useSnapshot } from "valtio";

export default function TriggerGetItemsFromLocalStorage() {
  // const storee = useSnapshot(store);
  const localStore = window.localStorage.getItem("basket")
    ? JSON.parse(window.localStorage.getItem("basket") || "")
    : {};

  if (Object.keys(localStore).length > 0) {
    store.basket = localStore.basket;
  }

  return null;
}
