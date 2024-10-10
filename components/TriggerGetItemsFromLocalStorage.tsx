"use client";

import store from "@/store";
import { useEffect } from "react";

export default function TriggerGetItemsFromLocalStorage() {
  
  useEffect(() => {
    try {
      const storedData = window.localStorage.getItem("basket");

      if (storedData) {
        const parsedData = JSON.parse(storedData);

        if (parsedData && parsedData.basket) {
          store.basket = parsedData.basket;
        }
      }
    } catch (error) {
      console.error("Error loading basket from localStorage:", error);
    }
  }, []);

  return null;
}
